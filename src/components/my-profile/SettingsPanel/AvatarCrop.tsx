/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const avatarAspect = 1;

const AvatarCrop = ({ src }: { src: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [_completedCrop, setCompletedCrop] = useState<PixelCrop>({
    ...crop,
    unit: 'px',
  });

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, avatarAspect));
  };

  return (
    <div className="flex flex-col items-center w-128 m-auto">
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
        style={{ transform: `scale(1)` }}
      >
        <img ref={imgRef} alt="Crop me" src={src} onLoad={onImageLoad} />
      </ReactCrop>
    </div>
  );
};
export default AvatarCrop;
