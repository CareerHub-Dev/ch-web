/* eslint-disable @next/next/no-img-element */
import { centerAspectCrop, cropImage } from "@/lib/images";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";

export default function ImageCrop({
  src,
  onCropComplete,
  fileType,
  aspect = ONE_TO_ONE_ASPECT,
}: {
  src: string;
  onCropComplete: (data: { url: string; blob: Blob }) => void;
  fileType: string;
  aspect?: number;
}) {
  const cropImgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCropBlob, setCompletedCropBlob] = useState<{
    blob: Blob;
    blobUrl: string;
    revokeUrl: () => void;
  }>();

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect]
  );

  const cropCompleteHandler = useCallback(
    async (completedCrop: PixelCrop) => {
      try {
        const croppedImageBlob = await cropImage(
          cropImgRef.current as HTMLImageElement,
          fileType,
          completedCrop
        );
        setCompletedCropBlob(croppedImageBlob);
        onCropComplete({
          url: croppedImageBlob.blobUrl,
          blob: croppedImageBlob.blob,
        });
      } catch (_ignored) {}
    },
    [fileType, onCropComplete]
  );

  useEffect(() => () => completedCropBlob?.revokeUrl(), [completedCropBlob]);

  return (
    <div className="block max-fit bg-lightBlue mt-4">
      <ReactCrop
        crop={crop}
        ruleOfThirds
        onChange={(_, percentCrop) => setCrop(percentCrop)}
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
