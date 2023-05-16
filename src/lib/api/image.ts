import { backendServerUrl } from ".";

export function getImage(imageId: string) {
    return `${backendServerUrl}/${imageId}`;
}
