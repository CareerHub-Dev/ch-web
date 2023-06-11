import { request } from "../../axios";
import { AxiosInstance } from "axios";

export function getTags(search: string) {
  return (instance: AxiosInstance) => {
    return request<Tag[]>({
      instance,
      url: "Auth/Tags",
      params: {
        search,
      },
    });
  };
}

export function addTag(instance: AxiosInstance) {
  return (name: string) => {
    return request({
      instance,
      url: "Company/Tags",
      method: "POST",
      data: { name },
    });
  };
}
