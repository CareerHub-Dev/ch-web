import { getImage, getImageWithDefault } from "@/lib/api/image";
import { Post } from "../hooks/use-self-posts-query";
import Image from "next/image";
import { matchUserRole } from "@/lib/enums";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { usePostLikedStatusMutation } from "../hooks/use-post-liked-status-query";

export default function PostItem({
  id,
  text,
  likes,
  createdDate,
  account,
  images,
  isLiked,
}: Post) {
  const authorAvatarUrl = getImageWithDefault(
    account.image,
    matchUserRole(account.role)
  );
  const imageSources = images?.map((image) => getImage(image));
  const formattedDateTime = format(new Date(createdDate), "yyyy-MM-dd, HH:mm");
  const { currentStatus: isLikedStatus, mutation } = usePostLikedStatusMutation({
    postId: id,
    initialValue: isLiked,
    account
  });

  return (
    <li className="bg-white px-4 py-6 shadow rounded-lg sm:p-6">
      <article aria-labelledby={"post-" + id}>
        <div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                src={authorAvatarUrl}
                alt="author"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {account.name}
              </p>

              <p className="text-sm text-gray-500">
                <time dateTime={createdDate}>{formattedDateTime}</time>
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 space-y-4 text-sm text-gray-700">{text}</p>
        {imageSources.length !== 0 ? (
          <ImageCarousel imageSources={imageSources} />
        ) : null}

        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                onClick={() => mutation.mutate(id)}
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                {isLikedStatus ? (
                  <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <HandThumbUpIconOutline
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                )}
                <span className="font-medium text-gray-900">{likes}</span>
                <span className="sr-only">likes</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
