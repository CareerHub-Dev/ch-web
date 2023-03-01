import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { isImageTypeValid, getFileExtension } from '@/lib/images';
import { type StaticImageData } from 'next/image';

export default function useImageUpload({
  initialData,
}: {
  initialData: string | StaticImageData;
}) {
  const [source, setSource] = useState<File | string | StaticImageData>(
    initialData
  );
  const [fileExtension, setFileExtension] = useState<string>('');
  const [url, setUrl] = useState(() => {
    if (typeof source === 'string') {
      return source;
    }
    if ('src' in source) {
      return source.src;
    }
    return '';
  });
  const isTouched = useBoolean(false);

  const change = (image: File) => {
    if (!isImageTypeValid(image)) {
      return;
    }
    setSource(image);
    setFileExtension(getFileExtension(image));
    setUrl(URL.createObjectURL(image));
    isTouched.setTrue();
  };

  const reset = () => {
    setSource(initialData);
    if (typeof initialData === 'string') {
      setUrl(initialData);
    } else if ('src' in initialData) {
      setUrl(initialData.src);
    }
    isTouched.setFalse();
  };

  const fileType =
    typeof source === 'object' && 'type' in source ? source.type : null;

  return {
    source,
    url,
    isTouched: isTouched.value,
    reset,
    change,
    fileType,
    fileExtension,
  };
}

export type UseImageUploadResult = ReturnType<typeof useImageUpload>;
