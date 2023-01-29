export const objectToFormData = (obj: {
  [key: string]: File | string | Array<any>;
}) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, item]) => {
    if (item instanceof File || typeof item === 'string') {
      formData.append(key, item);
    } else {
      formData.append(key, JSON.stringify(item));
    }
  });
  return formData;
};
