import {
  centerCrop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
} from "react-image-crop";

const supportedFileTypes = ["image/jpeg", "image/png"];

export const readUploadedImage = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject("Invalid reader result");
        return;
      }
      const img = reader.result.substring(reader.result.indexOf(",") + 1);
      resolve(img);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getFileNameExtension = (fileName: string) =>
  fileName.split(".").pop() ?? "";

export const getFileExtension = (file: File) => getFileNameExtension(file.name);

export const isImageTypeValid = (file: File) => {
  return supportedFileTypes.includes(file.type);
};

export const imageFromBase64 = (base64: string) => {
  return `data:image/jpeg;base64,${base64}`;
};

export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) =>
  centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );

/**
 * @deprecated
 * Use Crop namespace instead
 */
const getBlobFromCanvas = (canvas: HTMLCanvasElement, fileType: string) =>
  new Promise<{
    blob: Blob;
    blobUrl: string;
    revokeUrl: () => void;
  }>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        const revokeUrl = () => URL.revokeObjectURL(blobUrl);

        resolve({ blob, blobUrl, revokeUrl });
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, fileType);
  });

/**
 * @deprecated
 * Use Crop namespace cropImage instead
 */
export const cropImage = async (
  imgElement: HTMLImageElement,
  fileType: string,
  crop: PixelCrop
) => {
  const canvas = document.createElement("canvas");
  const scaleX = imgElement.naturalWidth / imgElement.width;
  const scaleY = imgElement.naturalHeight / imgElement.height;
  const pixelRatio = window.devicePixelRatio;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx!.imageSmoothingQuality = "high";

  ctx!.drawImage(
    imgElement,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  return getBlobFromCanvas(canvas, fileType);
};

const percentCropToPixelCrop = ({
  crop,
  dimensions,
}: {
  crop: PercentCrop;
  dimensions: { width: number; height: number };
}): PixelCrop => {
  const { width, height } = dimensions;

  return {
    unit: "px",
    x: (width * crop.x) / 100,
    y: (height * crop.y) / 100,
    width: (width * crop.width) / 100,
    height: (height * crop.height) / 100,
  };
};

export namespace Crop {
  const getBlobFromCanvas = ({
    canvas,
    fileType,
  }: {
    canvas: HTMLCanvasElement;
    fileType: string;
  }) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, fileType);
    });

  export const cropImage = async ({
    image,
    fileType,
    crop,
  }: {
    image: HTMLImageElement;
    fileType: string;
    crop: PixelCrop;
  }) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return getBlobFromCanvas({ canvas, fileType });
  };
}

export const fileUrlToImage = (fileUrl: string) =>
  new Promise<HTMLImageElement>((resolve, _reject) => {
    const image = new Image();
    image.src = fileUrl;
    image.onload = () => resolve(image);
    image.onerror = () => _reject(new Error("Failed to load image"));
  });

export const croppedImageFromFileAndCrop = async ({
  file,
  crop,
}: {
  file: File;
  crop: PercentCrop | PixelCrop;
}) => {
  const fileUrl = URL.createObjectURL(file);
  const image = await fileUrlToImage(fileUrl);
  const pixelCrop: PixelCrop =
    crop.unit === "%"
      ? percentCropToPixelCrop({
          crop,
          dimensions: {
            width: image.naturalWidth,
            height: image.naturalHeight,
          },
        })
      : crop;

  const blob = await Crop.cropImage({
    image,
    fileType: file.type,
    crop: pixelCrop,
  });
  URL.revokeObjectURL(fileUrl);
  return blob;
};
