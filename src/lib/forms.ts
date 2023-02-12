export const objectToFormData = (obj: {
  [key: string]: File | string | Array<any>;
}) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, item]) => {
    if (item instanceof File || (typeof item === "string" && item.length > 0)) {
      formData.append(key, item);
      return;
    }

    if (item instanceof Array) {
      item.forEach((subItem) => {
        formData.append(key, JSON.stringify(subItem));
      });
      return;
    }
  });
  return formData;
};
