import useAuth from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { deleteCv } from '@/lib/api/remote/CVs';
import ModalWithBackdrop from '@/components/ui/Modal/ModalWithBackdrop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import classes from './CVActions.module.scss';

const CVActions: React.FC<{
  title: string;
  cvId: string;
  onClose: AnyFn;
}> = ({ title, cvId, onClose }) => {
  const { session } = useAuth();
  const accessToken = session?.jwtToken as string;
  const deleteMutation = useMutation(
    ['deleteCv', cvId],
    deleteCv({
      accessToken,
      cvId,
    }),
    {
      onError: (err: any) =>
        alert(err.message || 'Помилка при видаленні резюме'),
      onSuccess: (_: any) => {
        onClose(true);
      },
    }
  );

  const deleteHandler = (event: any) => {
    event.preventDefault();
    deleteMutation.mutate();
  };

  return (
    <ModalWithBackdrop onClose={onClose} overrideOverlayClass={classes.overlay}>
      {deleteMutation.isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.actions}>
          <h2>{title}</h2>
          <button className={classes.edit} id="editButton">
            Редагувати
          </button>
          <button className={classes.download} id="downloadButton">
            Скачати файл
          </button>
          <button
            className={classes.delete}
            id="deleteButton"
            onClick={deleteHandler}
          >
            Видалити
          </button>
        </div>
      )}
    </ModalWithBackdrop>
  );
};
export default CVActions;
