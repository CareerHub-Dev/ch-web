import { backendApiBaseUrl, retrieveErrorMessage } from '..';

export const fetchJobOffers =
  ({
    token,
    pageNumber,
    pageSize = 50,
    filter,
  }: {
    token: string;
    pageNumber: number;
    pageSize?: number;
    filter?: JobOfferFilter;
  }) =>
  async () => {
    let url = `${backendApiBaseUrl}JobOffers?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    if (filter) {
      if (filter.searchTerm) {
        url += `&SearchTerm=${filter.searchTerm}`;
      }
      if (filter.jobType) {
        url += `&JobType=${filter.jobType}`;
      }
      if (filter.workFormat) {
        url += `&WorkFormat=${filter.workFormat}`;
      }
      if (filter.experienceLevel) {
        url += `&ExperienceLevel=${filter.experienceLevel}`;
      }
      if (filter.jobPositionId) {
        url += `&JobPositionId=${filter.jobPositionId}`;
      }
      if (filter.tagIds.length !== 0) {
        for (const tagId of filter.tagIds) {
          url += `&TagIds=${tagId}`;
        }
      }
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
      return {
        items: data,
        nextPage: data.length < pageSize ? null : pageNumber + 1,
      };
    }
    throw new Error(retrieveErrorMessage(data));
  };

export const fetchJobOfferDetails =
  ({ token, jobOfferId }: { token: string; jobOfferId: string }) =>
  async () => {
    const response = await fetch(
      `${backendApiBaseUrl}JobOffers/${jobOfferId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };

const fetchJobOfferSubResource =
  (token: string, jobOfferId: string, resource: string) => async () => {
    const response = await fetch(
      `${backendApiBaseUrl}JobOffers/${jobOfferId}/${resource}`,
      {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };

export const fetchJobOfferSubscribedStudentsAmount = ({
  token,
  jobOfferId,
}: {
  token: string;
  jobOfferId: string;
}) => fetchJobOfferSubResource(token, jobOfferId, 'amount-student-subscribers');

export const fetchJobOfferAppliedCvsAmount = ({
  token,
  jobOfferId,
}: {
  token: string;
  jobOfferId: string;
}) => {
  return fetchJobOfferSubResource(token, jobOfferId, 'amount-applied-cvs');
};

export const fetchJobOfferSubscriptionStatus = ({
  token,
  jobOfferId,
}: {
  token: string;
  jobOfferId: string;
}) => fetchJobOfferSubResource(token, jobOfferId, 'subscribe');

export const changeSubscriptionStatus =
  ({
    accessToken,
    jobOfferId,
    currentSubscriptionStatus,
  }: {
    accessToken: string | null;
    jobOfferId: string;
    currentSubscriptionStatus: boolean;
  }) =>
  async () => {
    const url = `${backendApiBaseUrl}JobOffers/${jobOfferId}/subscribe`;
    const response = await fetch(url, {
      method: currentSubscriptionStatus ? 'DELETE' : 'POST',
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

export const createJobOffer = async ({
  accessToken,
  data,
}: {
  accessToken: string | null;
  data: JobOfferForm.JobOffer;
}) => {
  const url = `${backendApiBaseUrl}JobOffers`;
  const formData = new FormData();
  for (const key in data) {
    const value = (data as any)[key];
    if (value) {
      formData.append(key, value);
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const reponseData = await response.json();
  if (response.ok) {
    return reponseData;
  }
  throw new Error(retrieveErrorMessage(reponseData));
};
