import useProtectedQuery from './useProtectedQuery';
import { getImage } from '@/lib/api/image';

export default function useImageQuery({
  imageId,
  onError,
  onSuccess,
}: {
  imageId?: string | null;
  onError?: AnyFn;
  onSuccess?: AnyFn;
}) {
  return useProtectedQuery(['image', imageId], getImage(imageId!), {
    onError,
    onSuccess,
    enabled: !!imageId,
  });
}
