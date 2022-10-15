const supportedFileTypes = ['image/jpeg', 'image/png'];

export const readUploadedImage = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject('Invalid reader result');
        return;
      }
      const img = reader.result.substring(reader.result.indexOf(',') + 1);
      resolve(img);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

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
