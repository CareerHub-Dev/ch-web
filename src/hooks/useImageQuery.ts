import useProtectedQuery from './useProtectedQuery';
import { fetchImage } from '@/lib/api/remote/images';

export default function useImageQuery({
  imageId,
  onError,
  onSuccess,
}: {
  imageId: string;
  onError?: AnyFn;
  onSuccess?: AnyFn;
}) {
  const q = useProtectedQuery(['image', imageId], fetchImage(imageId), {
    onError,
    onSuccess,
    retry: false,
  });
  return q;
}
