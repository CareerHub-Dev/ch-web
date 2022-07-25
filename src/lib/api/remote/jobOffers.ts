import { baseURL, retrieveErrorMessage } from '.';

export const fetchJobOffers =
  ({
    token,
    pageNumber,
    pageSize = 50,
    filter = {},
  }: {
    token: string;
    pageNumber: number;
    pageSize?: number;
    filter?: JobOfferFilter;
  }) =>
  async () => {
    let url = `${baseURL}JobOffers?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    if (filter.jobType) {
      url += `&JobType=${filter.jobType}`;
    }
    if (filter.workFormat) {
      url += `&WorkFormat=${filter.workFormat}`;
    }
    if (filter.experienceLevel) {
      url += `&ExperienceLevel=${filter.experienceLevel}`;
    }
    if (filter.withTags) {
      url += `&WithTags=${filter.withTags}`;
    }
    if (filter.jobPositionId) {
      url += `&JobPositionId=${filter.jobPositionId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };

export const fetchJobOfferDetails =
  ({ token, jobOfferId }: { token: string; jobOfferId: string }) =>
  async () => {
    const response = await fetch(`${baseURL}JobOffers/${jobOfferId}`, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
    const data = await response.json();
    throw new Error(retrieveErrorMessage(data));
  };

const fetchJobOfferSubResource =
  (token: string, jobOfferId: string, resource: string) => async () => {
    const response = await fetch(
      `${baseURL}JobOffers/${jobOfferId}/${resource}`,
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
