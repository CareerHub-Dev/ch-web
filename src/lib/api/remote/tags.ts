import { backendApiBaseUrl, retrieveErrorMessage } from '..';

export const getTags = (accessToken: Nullable<string>) => async () => {
  const response = await fetch(`${backendApiBaseUrl}Tags`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(retrieveErrorMessage(data));
};
