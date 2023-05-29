import { request } from "../../axios";
import { AxiosInstance } from "axios";

export function getTags(search: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: "Auth/Tags",
      params: {
        search,
      },
    });
  };
}
