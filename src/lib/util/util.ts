export const studentEmailRegex = /^[\w]+\.{1}[\w]+@nure.ua$/;

export const emailPattern = /^[\w-.]+@[\w-]+\.{1}[\w-]{2,}$/;

export const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,32}$/;

export function getEmailValidity(email: string) {
    return email.match(emailPattern) !== null;
}

export function getStudentEmailValidity(email: string) {
    return email.match(studentEmailRegex) !== null;
}

export function getPasswordValidity(password: string) {
    return password.match(passwordPattern) !== null;
}

export function getFormattedDate(month: string, year: string) {
    return month.padStart(2, "0") + "." + year;
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
    return value?.length > 0;
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

/**
 * Returns an array of years options
 */
export function getYearOptions(range: number, from?: number) {
    if (from === undefined) {
        from = new Date().getFullYear();
    }
    const options: Array<{id: string, name: string}> = [];
    for (let i = from; i > from - range; i--) {
        options.push({
            id: i.toString(),
            name: i.toString(),
        });
    }
    return options;
}

export const MONTH_OPTIONS = [
    { id: "01", name: "Січень (01)" },
    { id: "02", name: "Лютий (02)" },
    { id: "03", name: "Березень (03)" },
    { id: "04", name: "Квітень (04)" },
    { id: "05", name: "Травень (05)" },
    { id: "06", name: "Червень (06)" },
    { id: "07", name: "Липень (07)" },
    { id: "08", name: "Серпень (08)" },
    { id: "09", name: "Вересень (09)" },
    { id: "10", name: "Жовтень (10)" },
    { id: "11", name: "Листопад (11)" },
    { id: "12", name: "Грудень (12)" },
];
