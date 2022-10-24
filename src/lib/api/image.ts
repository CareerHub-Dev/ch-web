import { backendServerUrl } from '.';

export const getImage = (imageId: string) => `${backendServerUrl}/${imageId}`;
