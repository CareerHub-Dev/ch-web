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
