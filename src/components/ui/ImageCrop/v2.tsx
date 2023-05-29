/* eslint-disable @next/next/no-img-element */
import { centerAspectCrop, Crop as CropUtil } from "@/lib/images";
import { useCallback, useRef, useState, type SyntheticEvent } from "react";
import ReactCrop, {
  PercentCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";

export default function ImageCrop({
  src,
  onChangeCrop,
  fileType,
  aspect = ONE_TO_ONE_ASPECT,
  initialCrop = DEFAULT_PHOTO_CROP,
}: {
  src: string;
  onChangeCrop: (val: Blob) => void;
  fileType: string;
  aspect?: number;
  initialCrop?: Crop;
}) {
  const cropImgRef = useRef<HTMLImageElement>(null);
  const [actualCrop, setActualCrop] = useState(initialCrop);

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setActualCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect]
  );

  const cropCompleteHandler = useCallback(
    async (completedCrop: PixelCrop) => {
      try {
        const croppedImageBlob = await CropUtil.cropImage({
          image: cropImgRef.current!,
          fileType,
          crop: completedCrop,
        });
        onChangeCrop(croppedImageBlob);
      } catch (_ignored) {}
    },
    [fileType, onChangeCrop]
  );

  return (
    <div className="block max-fit bg-lightBlue mt-4">
      <ReactCrop
        crop={actualCrop}
        ruleOfThirds
        onChange={(_, percentCrop) => setActualCrop(percentCrop)}
        onComplete={cropCompleteHandler}
        aspect={aspect}
        className="block w-fit mx-auto"
      >
        <img
          ref={cropImgRef}
          alt="Crop me"
          src={src}
          onLoad={onImageLoad}
          className="max-w-fit"
        />
      </ReactCrop>
    </div>
  );
}

const ONE_TO_ONE_ASPECT = 1;
const DEFAULT_PHOTO_CROP: PercentCrop = {
  unit: "%",
  x: 25,
  y: 25,
  width: 50,
  height: 50,
};
