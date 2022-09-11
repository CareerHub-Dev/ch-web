import Image from 'next/image';

const LoadedImage = ({
  data,
  alt,
  className,
  width,
  height,
}: {
  data: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) => (
  <Image
    src={`data:image/jpeg;base64,${data}`}
    alt={alt}
    className={className}
    width={width}
    height={height}
  />
);
export default LoadedImage;
