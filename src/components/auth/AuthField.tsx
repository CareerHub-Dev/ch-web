import React, { useState, useRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import cn from 'classnames';
import classes from './AuthField.module.scss';

type Props = {
  id?: string;
  type?: string;
  placeholder?: string;
  isInputInvalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  validationMessage?: string;
  children?: React.ReactNode;
};

const AuthField = React.forwardRef<any, Props>(function AuthFieldComponent(
  {
    id,
    type = 'text',
    placeholder,
    children,
    isInputInvalid,
    onChange,
    onBlur,
    validationMessage,
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputType, setInputType] = useState(type);

  const focusInput = () => {
    inputRef.current!.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: focusInput,
    };
  });

  const showPasswordHandler = () => {
    setInputType((prevState) =>
      prevState === 'password' ? 'text' : 'password'
    );
  };

  return (
    <div id={`${id}FieldOuterDiv`} className={classes.root}>
      <div
        id={`${id}FieldInnerDiv`}
        className={cn(classes.field, isInputInvalid && classes.invalid)}
      >
        <label
          id={`${id}FieldLabel`}
          htmlFor={`${id}FieldInput`}
          className={classes.label}
        >
          {children}
        </label>
        <input
          id={`${id}FieldInput`}
          ref={inputRef}
          className={classes.input}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          id={`${id}FieldButton`}
          type="button"
          onClick={showPasswordHandler}
          className={cn(
            classes['field-eye'],
            type !== 'password' && classes.hidden
          )}
        >
          {inputType === 'password' ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
      {isInputInvalid && (
        <p id={`${id}ValidationLabel`} className={classes.validation}>
          {validationMessage}
        </p>
      )}
    </div>
  );
});

export default AuthField;
