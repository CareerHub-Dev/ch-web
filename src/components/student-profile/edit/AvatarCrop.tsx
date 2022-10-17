/* eslint-disable @next/next/no-img-element */
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type SyntheticEvent,
} from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import { centerAspectCrop, cropImage } from '@/lib/images';

const avatarAspect = 1;

const AvatarCrop = ({
  src,
  onCropComplete,
  fileType,
}: {
  src: string;
  onCropComplete: (cropBlobUrl: string) => void;
  fileType: string;
}) => {
  const cropImgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCropBlob, setCompletedCropBlob] = useState<any>();

  const onImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, avatarAspect));
  }, []);

  const cropCompleteHandler = useCallback(
    async (completedCrop: PixelCrop) => {
      const croppedImageBlob = await cropImage(
        cropImgRef.current as HTMLImageElement,
        fileType,
        completedCrop
      );
      setCompletedCropBlob(croppedImageBlob);
      onCropComplete(croppedImageBlob.blobUrl);
    },
    [fileType, onCropComplete]
  );

  useEffect(() => () => completedCropBlob?.revokeUrl(), [completedCropBlob]);

  return (
    <div className="block max-w-full bg-primaryGray mt-4">
      <ReactCrop
        crop={crop}
        ruleOfThirds
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={cropCompleteHandler}
        aspect={1}
        style={{ transform: `scale(1)` }}
        className="block w-fit mx-auto"
      >
        <img ref={cropImgRef} alt="Crop me" src={src} onLoad={onImageLoad} className="max-w-fit" />
      </ReactCrop>
    </div>
  );
};
export default AvatarCrop;
