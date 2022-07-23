import { baseURL, retrieveErrorMessage } from '.';

export const fetchCompanies =
  ({
    token,
    pageNumber,
    pageSize = 50,
    searchTerm = '',
  }: {
    token: string;
    pageNumber: number;
    pageSize?: number;
    searchTerm?: string;
  }) =>
  async () => {
    let url = `${baseURL}Companies?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    if (searchTerm) {
      url += `&SearchTerm=${searchTerm}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(retrieveErrorMessage(data));
  };

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const fetchCompanyLogo =
  ({ token, companyId }: { token: string; companyId: string }) =>
  async () => {
    const url = `${baseURL}Companies/${companyId}/logo`;
    const response = await fetch(url, {
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.blob().then((blob) => blobToBase64(blob));
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };
