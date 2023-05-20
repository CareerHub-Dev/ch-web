import { useSelfAvatarQuery } from "@/hooks/useSelfAvatarQuery";
import { getImage } from "@/lib/api/image";
import { useBoolean } from "usehooks-ts";
import Image from "next/image";
import defaultAvatar from "@/resources/images/default-avatar.png";
import cn from "classnames";

export default function UserAvatar() {
    const { data, isLoading } = useSelfAvatarQuery();
    const imageMightBeLoading = useBoolean(true);

    const imageSource = data ? getImage(data) : defaultAvatar;

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
                    src={imageSource}
                    alt="Ваш аватар"
                    onLoadingComplete={imageMightBeLoading.setFalse}
                />
            )}
        </span>
    );
}
