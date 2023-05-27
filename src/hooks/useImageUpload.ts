import { useState } from "react";

export type PhotoData = {
    sourceFileType: string;
    sourceFileName: string;
    croppedPhoto: Blob;
    croppedPhotoUrl: string;
};

export type LoadedPhotoData = {
    croppedImage: Blob;
    sourceFileName: string;
    sourceFileType: string;
};

export function useImageUpload() {
    const [data, setData] = useState<PhotoData>();

    const reset = () => {
        setData(undefined);
    };

    const load = (value: LoadedPhotoData) => {
        if (data !== undefined) {
            URL.revokeObjectURL(data.croppedPhotoUrl);
        }
        setData({
            sourceFileName: value.sourceFileName,
            sourceFileType: value.sourceFileType,
            croppedPhoto: value.croppedImage,
            croppedPhotoUrl: URL.createObjectURL(value.croppedImage),
        });
    };

    return {
        data,
        load,
        reset,
    };
}
