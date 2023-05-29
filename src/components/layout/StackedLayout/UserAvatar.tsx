import { useSelfAvatarQuery } from "@/hooks/useSelfAvatarQuery";
import { getImageWithDefault } from "@/lib/api/image";
import { useBoolean } from "usehooks-ts";
import useSession from "@/hooks/useSession";
import Image from "next/image";
import cn from "classnames";

export default function UserAvatar() {
  const { data, isLoading } = useSelfAvatarQuery();
  const { data: sessionData } = useSession();
  const imageMightBeLoading = useBoolean(true);
  const imageUrl = getImageWithDefault(data, sessionData?.role ?? "Student");

  return (
    <span
      className={cn(
        "rounded-full h-8 w-8 inline-flex bg-primaryGray",
        (isLoading || imageMightBeLoading.value) && "animate-pulse"
      )}
    >
      {!isLoading && (
        <Image
          className="rounded-full overflow-hidden aspect-square"
          width={32}
          height={32}
          src={imageUrl}
          alt="Ваш аватар"
          onLoadingComplete={imageMightBeLoading.setFalse}
        />
      )}
    </span>
  );
}
