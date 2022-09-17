import Image from 'next/image';
import { type UseImageUploadResult } from '@/hooks/useImageUpload/v2';
import cn from 'classnames';
import classes from '../Form.module.scss';
import UploadIcon from '../../icons/UploadIcon';
import LinkButton from '../../LinkButton';

const FormImageUpload = ({
  upload,
  onSave,
}: {
  upload: UseImageUploadResult;
  onSave?: AnyFn;
}) => {
  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    upload.change(file);
  };

  const resetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    upload.reset();
  };

  return (
    <div className="flex flex-col m-auto">
      <label
        htmlFor="photoInput"
        className={cn(classes['image-input'], 'my-2 text-center')}
      >
        <span>
          Завантажити зображення
          <UploadIcon />
        </span>
        <input
          id="photoInput"
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          multiple={false}
          onChange={uploadHandler}
        />
      </label>
      <Image src={upload.url} width={400} height={400} alt={'Аватар'} />
      {upload.isTouched ? (
        <>
          <LinkButton additionalClasses="my-2" onClick={resetHandler}>
            Відміна
          </LinkButton>
          {onSave && (
            <LinkButton
              style="light-blue-primary"
              additionalClasses="mb-2"
              onClick={onSave}
            >
              Зберегти
            </LinkButton>
          )}
        </>
      ) : null}
    </div>
  );
};
export default FormImageUpload;
