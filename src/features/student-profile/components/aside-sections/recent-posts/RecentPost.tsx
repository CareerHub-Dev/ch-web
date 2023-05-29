import Link from "next/link";
import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { getImage } from "@/lib/api/image";
import { limitText } from "@/lib/util";
import { Post } from "@/features/posts/hooks/use-self-posts-query";

export default function RecentPost({ id, text, account, likes }: Post) {
  const { name, image, role, id: accountId } = account;

  const avatarPath =
    image !== null
      ? getImage(image)
      : role === "student"
      ? "/default-avatar.png"
      : "/company-dummy-logo.png";

  const profilePath =
    role === "student" ? `/students/${accountId}` : `/companies/${accountId}`;

  const postPath = `/posts/${id}`;

  const limitedText = limitText(text, 100);

  return (
    <li className="flex space-x-3 py-4">
      <div className="flex-shrink-0">
        <Link href={profilePath} passHref>
          <Image
            className="h-8 w-8 rounded-full"
            src={avatarPath}
            width={32}
            height={32}
            alt={name}
          />
        </Link>
      </div>
      <Link href={postPath} passHref>
        <div className="min-w-0 flex-1 cursor-pointer">
          <p className="text-sm text-gray-800">{limitedText}</p>
          <div className="mt-2 flex">
            <span className="inline-flex items-center text-sm">
              <div className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{likes}</span>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
