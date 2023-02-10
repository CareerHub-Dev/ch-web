import { type UserRole } from '@/lib/schemas/UserRole';
import { useQuery } from '@tanstack/react-query';
import useSession from './useSession';
import { z } from 'zod';
import { request } from '@/lib/axios';
import { AxiosInstance } from 'axios';

export function useSelfAvatarQuery() {
  const {
    data: sessionData,
    status: sessionStatus,
    axios: axiosInstance,
  } = useSession();
  return useQuery(['self-avatar'], {
    queryFn: () =>
      getSelfRequestFn({
        instance: axiosInstance,
        role: sessionData?.role,
      }),
    enabled: sessionStatus === 'authenticated',
  });
}

function getSelfRequestFn({
  role,
  instance,
}: {
  role?: UserRole;
  instance: AxiosInstance;
}) {
  return request({
    instance,
    prefix: role,
    url: getSelfRequestUrl(role),
    select: (res) => getSelfResponseSchema(role).parseAsync(res.data),
  });
}

function getSelfRequestUrl(role?: UserRole) {
  return encodeURIComponent(
    role === 'Company' ? 'Companies/self' : 'Students/self'
  );
}

function getSelfResponseSchema(role?: UserRole) {
  if (role === 'Company') {
    return z
      .object({
        logo: z.string().nullable(),
      })
      .transform((val) => val.logo);
  }
  return z
    .object({
      photo: z.string().nullable(),
    })
    .transform((val) => val.photo);
}
