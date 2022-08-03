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
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };

export const updateStudentGeneralInfo =
  ({
    accountId,
    accessToken,
    firstName,
    lastName,
    photo,
    phone,
  }: {
    accountId: string;
    accessToken: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    phone?: string;
  }) =>
  async () => {
    try {
      const url = `${baseURL}Students/${accountId}`;
      const response = await fetch(url, {
        method: 'PUT',
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
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };

export const fetchStudentCvs =
  ({ accountId, accessToken }: { accountId: string; accessToken: string }) =>
  async () => {
    try {
      const url = `${baseURL}Students/${accountId}/CVs`;
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
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };
