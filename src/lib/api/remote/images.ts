import { backendApiBaseUrl, retrieveErrorMessage } from '..';

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const fetchImage =
  (imageId: string) => (accessToken: Nullable<string>) => async () => {
    const response = await fetch(`${backendApiBaseUrl}/Images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      return await response.blob().then((blob) => blobToBase64(blob));
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };
