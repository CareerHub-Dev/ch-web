import { backendApiBaseUrl, retrieveErrorMessage } from '..';

export const fetchJobPositions = async (accessToken?: string) => {
  const url = `${backendApiBaseUrl}JobPositions`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    return response.json();
  }
  const data = await response.json();
  throw new Error(retrieveErrorMessage(data));
};
