import LinkButton from '../ui/LinkButton';
import FormInput from '../ui/form/FormInput';
import ModalWithBackdrop from '../ui/Modal/ModalWithBackdrop';
import {
  setTitle,
  setSaveModalIsOpen,
  selectTitle,
  selectEntireCVState,
  reset,
} from '@/store/cv-constructor';
import useAuth from '@/hooks/useAuth';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { postCv } from '@/lib/api/remote/CVs';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import { useRouter } from 'next/router';
import ModalLoading from '../ui/Modal/ModalLoading';

import classes from './SaveModal.module.scss';

const SaveModal = () => {
  const { accessToken, accountId } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cvState = useSelector(selectEntireCVState);
  const titleInput = useReduxStringInput(selectTitle, setTitle);
  const saveMutation = useMutation(postCv, {
    onError: (error: any) => {
      alert && alert(error?.message || 'Невідома помилка');
    },
    onSuccess: (_: any) => {
      dispatch(setSaveModalIsOpen(false));
      dispatch(reset());
      router.push('/my-profile?section=cvs');
    },
  });

  const closeHandler = (event: any) => {
    event.preventDefault();
    dispatch(setSaveModalIsOpen(false));
  };

  const saveHandler = (event: any) => {
    event.preventDefault();
    titleInput.inputBlurHandler();
    if (titleInput.hasError) {
      return;
    }
    const body = {
      ...cvState,
      studentId: accountId,
      title: titleInput.value,
      Title: titleInput.value,
      TemplateLanguage: cvState.templateLanguage,
    };
    saveMutation.mutate({ body, accessToken: accessToken as string });
  };

  return (
    <>
      {saveMutation.isLoading && <ModalLoading />}
      <ModalWithBackdrop onClose={closeHandler}>
        <div className={classes.container}>
          <h1>Зберегти резюме</h1>
          <FormInput id="title" label="Назва" input={titleInput} />
          <LinkButton style="light-blue-primary" onClick={saveHandler}>
            Зберегти
          </LinkButton>
          <LinkButton style="dark-blue-primary" onClick={closeHandler}>
            Скасувати
          </LinkButton>
        </div>
      </ModalWithBackdrop>
    </>
  );
};
export default SaveModal;
