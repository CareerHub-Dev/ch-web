import useProtectedQuery from './useProtectedQuery';
import { getImage } from '@/lib/api/image';

export default function useImageQuery({
  imageId,
  onError,
  onSuccess,
  enabled,
}: {
  imageId: string;
  onError?: AnyFn;
  onSuccess?: AnyFn;
  enabled?: boolean;
}) {
  const q = useProtectedQuery(['image', imageId], getImage(imageId), {
    onError,
    onSuccess,
    retry: false,
    enabled,
  });
  return q;
}
