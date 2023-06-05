import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({
  imageSources,
}: {
  imageSources: string[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleGoLeft = () => {
    setCurrentImageIndex((current) => --current);
  };
  const handleGoRight = () => {
    setCurrentImageIndex((current) => ++current);
  };

  const displayGoLeftButton =
    currentImageIndex !== 0 &&
    imageSources.at(currentImageIndex - 1) !== undefined;
  const displayGoRightButton =
    imageSources.at(currentImageIndex + 1) !== undefined;
  return (
    <div className="relative w-full h-auto py-4 px-4 m-auto">
      <Image
        src={imageSources[currentImageIndex]!}
        alt={`публікація-${currentImageIndex + 1}`}
        width={1024}
        height={256}
        className="mx-auto w-auto max-h-64 rounded-2xl"
      />
      {displayGoLeftButton ? (
        <button
          type="button"
          onClick={handleGoLeft}
          className="rounded-full bg-gray-500 z-10 absolute top-[50%] -tanslate-x-0 translate-y-[-50%] left-5"
        >
          <ArrowLeftCircleIcon className="text-white h-6 w-6" />
        </button>
      ) : null}
      {displayGoRightButton ? (
        <button
          type="button"
          onClick={handleGoRight}
          className="rounded-full bg-gray-500 z-10 absolute top-[50%] -tanslate-x-0 translate-y-[-50%] right-5"
        >
          <ArrowRightCircleIcon className="text-white h-6 w-6" />
        </button>
      ) : null}
    </div>
  );
}
