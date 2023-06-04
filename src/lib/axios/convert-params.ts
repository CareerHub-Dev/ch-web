import { AxiosRequestConfig } from "axios";

export function convertParams(params: AxiosRequestConfig["params"]) {
  const newParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (value instanceof Array) {
        value.forEach((arrayValue: unknown) => {
          if (arrayValue !== undefined && arrayValue !== null) {
            newParams.append(key, arrayValue.toString());
          }
        });
      } else {
        newParams.append(key, value.toString());
      }
    }
  }
  return newParams;
}
