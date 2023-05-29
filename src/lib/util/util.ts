export const studentEmailPattern = /^[\w]+\.{1}[\w]+@nure.ua$/;

export const emailPattern = /^[\w-.]+@[\w-]+\.{1}[\w-]{2,}$/;

export const passwordPattern =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,32}$/;

export function getEmailValidity(email: string) {
  return email.match(emailPattern) !== null;
}

export function getStudentEmailValidity(email: string) {
  return email.match(studentEmailPattern) !== null;
}

export function getPasswordValidity(password: string) {
  return password.match(passwordPattern) !== null;
}

export function getReadableDateFromString(
  date: string,
  locale: string = "uk-UA"
) {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export function notEmpty(value: string | Array<any> | null) {
  if (value === null) {
    return false;
  }
  return value.length > 0;
}

export function isFileValid(file: File, types: Array<string>) {
  const fileName = file.name;
  const extensionIndex = fileName.lastIndexOf(".") + 1;
  const fileExtension = fileName
    .substring(extensionIndex, fileName.length)
    .toLowerCase();

  if (types.includes(fileExtension)) {
    return true;
  }
  return false;
}

export function isFileImage(file: File) {
  return isFileValid(file, ["jpg", "jpeg", "png"]);
}

export function getControlHint() {
  let hint = "Ctrl";
  try {
    if (navigator?.userAgent.indexOf("Mac") != -1) {
      hint = "⌘";
    }
  } catch (e) {
    if (!(e instanceof ReferenceError)) {
      throw e;
    }
  }
  return hint;
}

export function fillThisFieldValidator(message: string) {
  return (value: string) =>
    value.trim().length > 0
      ? ({ type: "success" } as const)
      : ({
          type: "error",
          message,
        } as const);
}

export function limitText(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}
