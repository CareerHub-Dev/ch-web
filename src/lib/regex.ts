export const phoneNumberRegex =
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const isPhoneNumber = (value: string) => {
  return value.match(phoneNumberRegex) !== null;
};
