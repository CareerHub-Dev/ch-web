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
