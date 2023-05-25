import { backendServerUrl } from ".";
import { UserRole } from "../schemas/UserRole";

export function getImage(imageId: string) {
    return `${backendServerUrl}/${imageId}`;
}

export function getDefaultImage(role: UserRole) {
    if (role === "Company") {
        return "/company-dummy-logo.png";
    }
    return "/default-avatar.png";
}

export function getImageWithDefault(
    imageId: string | undefined | null,
    role: UserRole
) {
    if (typeof imageId === "string") {
        return getImage(imageId);
    }
    return getDefaultImage(role);
}

export function getCompanyBanner(imageId: string | undefined | null) {
    if (typeof imageId === "string") {
        return getImage(imageId);
    }
    return "/company-dummy-banner.png";
}

export function getJobOfferLogo(
    logo: string | undefined | null,
    companyLogo: string | undefined | null
) {
    if (typeof logo === "string") {
        return getImage(logo);
    }
    if (typeof companyLogo === "string") {
        return getImage(companyLogo);
    }
    return "/company-dummy-logo.png";
}
