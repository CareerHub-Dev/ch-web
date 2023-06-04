import PostEditMenu from "@/features/posts/components/PostEditMenu";
import { Post } from "@/features/posts/hooks/use-self-posts-query";
import { getImageWithDefault, getImage } from "@/lib/api/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import Image from "next/image";

export default function StudentPost({
  isSelf,
  post,
}: {
  isSelf: boolean;
  post: Post;
}) {
  const { id, text, likes, createdDate, account, images } = post;
  const authorAvatarUrl = getImageWithDefault(account.image, "Student");

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
                <time dateTime={createdDate}>
                  {format(new Date(createdDate), "LLLL d, yyyy")}
                </time>
              </p>
            </div>
            {isSelf ? (
              <div className="flex flex-shrink-0 self-center">
                <PostEditMenu onRemoveClick={() => {}} />
              </div>
            ) : null}
          </div>
        </div>
        <p className="mt-2 space-y-4 text-sm text-gray-700">{text}</p>

        <section className="mt-2">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image, imageIdx) => (
              <li key={imageIdx} className="relative">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                  <Image
                    src={getImage(image)}
                    alt="Post image"
                    width={1024}
                    height={512}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                disabled={isSelf}
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
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
