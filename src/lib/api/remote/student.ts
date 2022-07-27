import { baseURL, retrieveErrorMessage } from '.';

export const fetchStudent =
  ({ accountId, accessToken }: { accountId: string; accessToken: string }) =>
  async () => {
    try {
      const url = `${baseURL}Students/${accountId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(retrieveErrorMessage(data));
    } catch (error: any) {
      throw new Error(error.message || 'Помилка звернення до серверу');
    }
  };
