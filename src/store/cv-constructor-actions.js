import { isFileImage } from '@/lib/util';
import { setPhoto } from './cv-constructor';

export const loadPhoto = (event) => {
  return (dispatch) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];
    if (!isFileImage(file)) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      dispatch(setPhoto(result.substring(result.indexOf(',') + 1)));
    };
  };
};
