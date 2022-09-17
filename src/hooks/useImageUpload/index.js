import { useState } from 'react';

const supportedFileExtensions = ['jpg', 'jpeg', 'png'];

const readUploadedImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result.substr(reader.result.indexOf(',') + 1));
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const isFileTypeValid = (file) => {
  const fileName = file.name;
  const extensionIndex = fileName.lastIndexOf('.') + 1;
  const fileExtension = fileName
    .substr(extensionIndex, fileName.length)
    .toLowerCase();

  if (supportedFileExtensions.includes(fileExtension)) {
    return true;
  }
  return false;
};

const useImageUpload = () => {
  const [image, setImage] = useState('');

  const imageUploadHandler = async (event) => {
    const file = event.target.files[0];
    const imageIsValid = isFileTypeValid(file);
    if (!imageIsValid) {
      setImage('');
      return;
    }
    const convertedImage = await readUploadedImage(file);
    setImage(convertedImage);
  };

  const reset = () => {
    setImage('');
  };

  return {
    data: image,
    onUpload: imageUploadHandler,
    reset: reset,
  };
};

export default useImageUpload;
