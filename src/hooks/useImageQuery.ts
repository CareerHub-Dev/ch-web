import useProtectedQuery from './useProtectedQuery';
import { getImage } from '@/lib/api/image';

export default function useImageQuery({
  imageId,
  onError,
  onSuccess,
  enabled,
  refetchOnMount,
}: {
  imageId: string;
  onError?: AnyFn;
  onSuccess?: AnyFn;
  enabled?: boolean;
  refetchOnMount?: boolean;
}) {
  const q = useProtectedQuery(['image', imageId], getImage(imageId), {
    onError,
    onSuccess,
    retry: false,
    enabled,
    refetchOnMount,
  });
  return q;
}
