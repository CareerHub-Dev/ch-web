import Image from 'next/image';

import classes from './Form.module.scss';

const FormImageUpload: React.FC<{
  id: string;
  label?: string;
  data: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onRemove: (...params: any[]) => any;
}> = ({
  id,
  label = 'Завантажити фото',
  data,
  alt,
  className,
  width = 200,
  height = 200,
  onChange,
  onRemove,
}) => {
  let displayedLabel = label;
  if (data !== '') {
    displayedLabel = 'Змінити фото';
  }

  return (
    <div className={classes['image-upload-wrapper']}>
      <label htmlFor={`photoInput${id}`}>
        <i className="fas fa-upload" />
        {displayedLabel}
        <input
          id={`photoInput${id}`}
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          multiple={false}
          onChange={onChange}
        />
      </label>
      {data && (
        <>
          <Image
            src={`data:image/jpeg;base64,${data}`}
            alt={alt}
            className={className}
            width={width}
            height={height}
          />
          <button onClick={onRemove}>
            <i className="fas fa-ban" />
            {` Видалити`}
          </button>
        </>
      )}
    </div>
  );
};

export default FormImageUpload;
