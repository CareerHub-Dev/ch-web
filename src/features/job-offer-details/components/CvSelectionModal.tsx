import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import LoadMore from "@/components/ui/LoadMore";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { CvItemsSearch } from "@/features/student-cvs/components/CvItemsSearch";
import { useCvsQuery } from "@/features/student-cvs/hooks/use-cvs-query";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useQueryClient } from "@tanstack/react-query";
import CvItemForApplication from "./CvItemForApplication";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CvSelectionModal({
  jobOfferId,
  onClose,
  show,
}: {
  jobOfferId: string;
  onClose: () => void;
  show: boolean;
}) {
  const client = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCvsQuery(debouncedSearch);
  const items = data?.pages.flatMap((page) => page.data) ?? [];

  const handleSuccess = () => {
    client.invalidateQueries(["job-offer-applications", jobOfferId]);
    onClose();
  };

  return (
    <DialogWithBackdrop show={show} onClose={onClose}>
      <CvItemsSearch search={search} setSearch={setSearch} />
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          <div className="mt-3 mb-5">
            {items.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100 space-y-5">
                {items.map((item, itemIndex) => (
                  <CvItemForApplication
                    key={itemIndex}
                    {...item}
                    jobOfferId={jobOfferId}
                    onSuccess={handleSuccess}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <EmptyState noItemsText="Ви поки що не створили жодного резюме" />
                <Link
                  href="/my-cvs/create"
                  className="mt-2 btn-primary rounded-md px-2.5 py-1.5 text-sm"
                >
                  <PlusIcon className="inline-block w-4 h-4 text-white" />{" "}
                  {"Створити"}
                </Link>
              </div>
            )}
          </div>
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
