import { baseURL, retrieveErrorMessage } from '.';

export const sendGetStudentRequest = async (
  studentId: string,
  accessToken: string
) => {
  try {
    const url = `${baseURL}Students/${studentId}`;
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
    throw new Error(
      error.message ? error.message : 'Помилка звернення до серверу'
    );
  }
};
