import { useReducer } from "react";

type TempPhotoState = {
  source: File;
  sourceUrl: string;
  cropped: Blob;
};

type PhotoPayload = {
  photoSource: File;
  croppedPhotoBlob: Blob;
};

type UseImageCropState =
  | {
      temporaryPhoto: TempPhotoState;
      isLoaded: true;
    }
  | {
      temporaryPhoto: undefined;
      isLoaded: false;
    };

type UseImageCropAction =
  | {
      type: "load";
      value: PhotoPayload;
    }
  | { type: "changeCrop"; value: Blob }
  | { type: "reset" };

const initialState = {
  temporaryPhoto: undefined,
  isLoaded: false,
} satisfies UseImageCropState;

function imageCropReducer(
  state: UseImageCropState,
  action: UseImageCropAction
): UseImageCropState {
  switch (action.type) {
    case "reset":
      if (state.isLoaded) {
        URL.revokeObjectURL(state.temporaryPhoto.sourceUrl);
      }
      return {
        ...initialState,
      };
    case "changeCrop":
      if (state.isLoaded) {
        return {
          ...state,
          temporaryPhoto: {
            ...state.temporaryPhoto,
            cropped: action.value,
          },
        };
      }

      return {
        ...state,
      };
    case "load":
      if (state.isLoaded) {
        URL.revokeObjectURL(state.temporaryPhoto.sourceUrl);
      }
      const { photoSource, croppedPhotoBlob } = action.value;
      const sourceUrl = URL.createObjectURL(photoSource);

      return {
        isLoaded: true,
        temporaryPhoto: {
          source: photoSource,
          sourceUrl,
          cropped: croppedPhotoBlob,
        },
      };
    default:
      return { ...state };
  }
}

export default function useImageCrop() {
  const [state, dispatch] = useReducer(imageCropReducer, initialState);

  const load = (value: PhotoPayload) =>
    dispatch({
      type: "load",
      value,
    });

  const reset = () => dispatch({ type: "reset" });

  const changeCrop = (value: Blob) =>
    dispatch({
      type: "changeCrop",
      value,
    });

  return {
    ...state,
    reset,
    load,
    changeCrop,
  };
}
