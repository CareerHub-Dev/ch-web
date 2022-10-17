import { request } from '../axios';

export const getImage = (imageId: string) => (token: string | null) => () =>
  request({
    prefix: 'Auth',
    url: `Images/${imageId}`,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    select: (response) => URL.createObjectURL(response.data),
  });