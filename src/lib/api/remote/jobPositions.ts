import { baseURL, retrieveErrorMessage } from '.';

export const fetchJobPositions =
  ({ accessToken }: { accessToken: Nullable<string> }) =>
  async () => {
    const url = `${baseURL}JobPositions`;
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
