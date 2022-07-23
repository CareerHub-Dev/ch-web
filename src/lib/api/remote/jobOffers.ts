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

    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(retrieveErrorMessage(error));
      });
  };
