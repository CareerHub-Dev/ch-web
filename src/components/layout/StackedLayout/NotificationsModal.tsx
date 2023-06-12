import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { AxiosInstance } from "axios";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { request } from "@/lib/axios";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import LoadMore from "@/components/ui/LoadMore";
import { z } from "zod";
import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { getImage } from "@/lib/api/image";
import { limitText } from "@/lib/util";
import Image from "next/image";
import format from "date-fns/format";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import { removeFromPaginatedCache } from "@/lib/paginated-cache";
import useSession from "@/hooks/useSession";

const notificationSchema = z.object({
  id: z.string(),
  referenceId: z.string(),
  ukMessage: z.string(),
  enMessage: z.string(),
  image: z.string().nullable(),
  isViewed: z.boolean(),
  created: z.string(),
  type: z.string(),
});

// enum NotificationType {
//   JobOffer,
//   Post,
//   Student,
//   Review,
// }

function getUnviewedNotifications(
  instance: AxiosInstance,
  params: PaginatedQueryParams
) {
  return request({
    instance,
    method: "GET",
    url: "Student/Notifications/self/unviewed",
    params,
    select: parsePaginatedResponseAsync(z.array(notificationSchema)),
  });
}

function markNotificationAsViewed(instance: AxiosInstance) {
  return (notificationId: string) => {
    return request({
      instance,
      method: "POST",
      url: `Student/Notifications/self/set-viewed`,
      data: {
        notificationId,
      },
    });
  };
}

function useSetViewedMutation() {
  const client = useQueryClient();
  const toast = useToast();
  const queryKey = ["unviewed-notifications"];
  const amountQueryKey = ["notifications", "amount-unviewed"];
  const mut = useProtectedMutation(["mark-viewed"], markNotificationAsViewed, {
    onMutate: (notificationId) => {
      const cachedStatus = client.getQueryData(queryKey);
      const cachedAmount = client.getQueryData(amountQueryKey);
      if (typeof cachedAmount === "number") {
        client.setQueryData(amountQueryKey, cachedAmount - 1);
      }
      client.setQueryData(
        queryKey,
        removeFromPaginatedCache(cachedStatus, notificationId)
      );

      return () => {
        client.setQueryData(queryKey, cachedStatus);
        client.setQueryData(amountQueryKey, cachedAmount);
      };
    },
    onError: (error, _variables, restoreCache) => {
      if (restoreCache) {
        restoreCache();
      }
      toast.error("Помилка: " + parseUnknownError(error));
    },
    onSettled: () => {
      client.invalidateQueries(queryKey);
      client.invalidateQueries(amountQueryKey);
    },
  });
  return mut;
}

function Notificationitem({
  ukMessage,
  image,
  created,
  id,
}: z.infer<typeof notificationSchema>) {
  const mut = useSetViewedMutation();
  const handleSetViewed = (notificationId: string) => {
    mut.mutate(notificationId);
  };
  return (
    <li className="pointer-events-auto w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              className="h-10 w-10 rounded-md"
              width={40}
              height={40}
              src={getImage(image ?? "/android-chrome-192x192.png")}
              alt={limitText(ukMessage, 10)}
            />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{ukMessage}</p>
            <p className="mt-1 text-sm text-gray-500">
              {format(new Date(created), "yyyy/MM/dd, HH:mm")}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSetViewed.bind(null, id)}
            >
              <span className="sr-only">{"Відмітити як прочитане"}</span>
              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function NotificationsModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const session = useSession();
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProtectedPaginatedQuery({
    queryKey: ["unviewed-notifications"],
    getItems: getUnviewedNotifications,
    params: {
      pageSize: 20,
    },
    enabled: session.data?.role === "Student",
  });

  const noItems =
    data?.pages[0] === undefined ||
    data.pages[0].data === undefined ||
    data.pages[0].data.length === 0;

  return (
    <DialogWithBackdrop
      show={show}
      onClose={onClose}
      title={"Повідомлення"}
      panelSize="3xl"
    >
      <hr className="my-4 border-t-gray-300" />
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : isError ? (
        <p className="text-red-500 text-center">{parseUnknownError(error)}</p>
      ) : noItems ? (
        <p className="text-gray-600 italic text-center">
          {"Повідомлень немає"}
        </p>
      ) : (
        <>
          {data.pages.map((page, pageIdx) => (
            <Fragment key={pageIdx}>
              <ul className="space-y-4">
                {page.data.map((notification, notificationIdx) => (
                  <Notificationitem key={notificationIdx} {...notification} />
                ))}
              </ul>
            </Fragment>
          ))}

          {isFetchingNextPage ? (
            <CenteredLoadingSpinner />
          ) : hasNextPage ? (
            <LoadMore onClick={fetchNextPage} />
          ) : null}
        </>
      )}
    </DialogWithBackdrop>
  );
}
