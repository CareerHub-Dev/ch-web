import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { isImageTypeValid } from '@/lib/images';

export default function useImageUpload({
  initialData,
}: {
  initialData: string;
}) {
  const [source, setSource] = useState<File | string>(initialData);
  const [url, setUrl] = useState(initialData);
  const isTouched = useBoolean(false);

  const change = (image: File) => {
    if (!isImageTypeValid(image)) {
      return;
    }
    setSource(image);
    setUrl(URL.createObjectURL(image));
    isTouched.setTrue();
  };

  const reset = () => {
    setSource(initialData);
    setUrl(initialData);
    isTouched.setFalse();
  };

  return {
    source,
    url,
    isTouched: isTouched.value,
    reset,
    change,
    fileType: source instanceof File ? source.type : null,
  };
}

export type UseImageUploadResult = ReturnType<typeof useImageUpload>;
