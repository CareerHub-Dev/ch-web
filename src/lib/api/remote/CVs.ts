import { baseURL, retrieveErrorMessage } from '.';

export const postCv = async ({
  accessToken,
  body,
}: {
  accessToken: string;
  body: any;
}) => {
  const formData = new FormData();
  for (const key in body) {
    const value = body[key];
    if (value) {
      formData.append(key, value);
    }
  }

  const response = await fetch(`${baseURL}/CV`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (response.ok) {
    return response.json();
  }
  const data = await response.json();
  throw new Error(retrieveErrorMessage(data));
};

export const fetchCv =
  ({ accessToken, cvId }: { accessToken: string; cvId: string }) =>
  async () => {
    const response = await fetch(`${baseURL}/CV/${cvId}`, {
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

export const deleteCv =
  ({ accessToken, cvId }: { accessToken: string; cvId: string }) =>
  async () => {
    const response = await fetch(`${baseURL}/CV/${cvId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      return {
        success: true,
      };
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };
