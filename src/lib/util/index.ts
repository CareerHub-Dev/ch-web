export const studentEmailRegex = /^[\w]+\.{1}[\w]+@nure.ua$/;

export const emailRegex = /^[\w-.]+@[\w-]+\.{1}[\w-]{2,}$/;

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,32}$/;

export const getEmailValidity = (email: string) =>
  email.match(emailRegex) !== null;

export const getStudentEmailValidity = (email: string) =>
  email.match(studentEmailRegex) !== null;

export const getPasswordValidity = (password: string) =>
  password.match(passwordRegex) !== null;

export const getFormattedDate = (month: string, year: string) => {
  return month.padStart(2, '0') + '.' + year;
};

export const getReadableDateFromString = (
  date: string,
  locale: string = 'uk-UA'
) =>
  new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

export const notEmpty = (value: string | Array<any> | null) => {
  if (value === null) {
    return false;
  }
  return value?.length > 0;
};

export const isFileValid = (file: File, types: Array<string>) => {
  const fileName = file.name;
  const extensionIndex = fileName.lastIndexOf('.') + 1;
  const fileExtension = fileName
    .substring(extensionIndex, fileName.length)
    .toLowerCase();

  if (types.includes(fileExtension)) {
    return true;
  }
  return false;
};

export const isFileImage = (file: File) =>
  isFileValid(file, ['jpg', 'jpeg', 'png']);
