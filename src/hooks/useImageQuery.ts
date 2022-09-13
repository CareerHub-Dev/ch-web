import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
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
  const { accessToken } = useAuth();
  return useQuery(['image', imageId], fetchImage({ accessToken, imageId }), {
    enabled: !!accessToken,
    onError,
    onSuccess,
    retry: false,
  });
}
