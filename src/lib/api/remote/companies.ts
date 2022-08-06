import { baseURL, retrieveErrorMessage } from '.';

export const fetchCompanies =
  ({
    accessToken,
    pageNumber,
    pageSize,
    searchTerm = '',
  }: {
    accessToken: string | null;
    pageNumber: number;
    pageSize: number;
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
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return {
        companies: data,
        nextPage: data.length === pageSize ? pageNumber + 1 : null,
      };
    }
    throw new Error(retrieveErrorMessage(data));
  };

export const fetchCompanyDetails =
  ({ token, companyId }: { token: string; companyId: string }) =>
  async () => {
    const url = `${baseURL}Companies/${companyId}`;
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

export const fetchCompanySubResource =
  ({
    accessToken,
    companyId,
    resourceName,
    resourceId,
  }: {
    accessToken: string | null;
    companyId: string;
    resourceName: string;
    resourceId?: string;
  }) =>
  async () => {
    const url = `${baseURL}Companies/${companyId}/${resourceName}${
      resourceId ? '/' + resourceId : ''
    }`;
    const response = await fetch(url, {
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

export const fetchCompanyLinks = ({
  accessToken,
  companyId,
}: {
  accessToken: string | null;
  companyId: string;
}) =>
  fetchCompanySubResource({
    accessToken,
    companyId,
    resourceName: 'AdditionalLinks',
  });

export const fetchCompanyJobOffersAmount = ({
  accessToken,
  companyId,
}: {
  accessToken: string | null;
  companyId: string;
}) =>
  fetchCompanySubResource({
    accessToken,
    companyId,
    resourceName: 'amount-jobOffers',
  });

export const fetchCompanySubscribersAmount = ({
  accessToken,
  companyId,
}: {
  accessToken: string | null;
  companyId: string;
}) =>
  fetchCompanySubResource({
    accessToken,
    companyId,
    resourceName: 'amount-subscribers',
  });

export const fetchCompanySubscriptionStatus = ({
  accessToken,
  companyId,
}: {
  accessToken: string | null;
  companyId: string;
}) =>
  fetchCompanySubResource({
    accessToken,
    companyId,
    resourceName: 'subscribe',
  });

export const changeSubscriptionStatus =
  ({
    accessToken,
    companyId,
    subscriptionStatus,
  }: {
    accessToken: string | null;
    companyId: string;
    subscriptionStatus: boolean;
  }) =>
  async () => {
    const url = `${baseURL}Companies/${companyId}/subscribe`;
    const response = await fetch(url, {
      method: subscriptionStatus ? 'DELETE' : 'POST',
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
