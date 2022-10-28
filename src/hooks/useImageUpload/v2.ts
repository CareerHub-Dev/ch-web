import { useState, useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';
import { isImageTypeValid } from '@/lib/images';

export default function useImageUpload({
  initialData,
}: {
  initialData: string;
}) {
  const [source, setSource] = useState<File | string>(initialData);
  const [fileExtension, setFileExtension] = useState<string>('');
  const [url, setUrl] = useState(initialData);
  const isTouched = useBoolean(false);

  const change = (image: File) => {
    if (!isImageTypeValid(image)) {
      return;
    }
    setSource(image);
    setFileExtension(image.name.split('.').pop() || '');
    setUrl(URL.createObjectURL(image));
    isTouched.setTrue();
  };

  const reset = () => {
    setSource(initialData);
    setUrl(initialData);
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
