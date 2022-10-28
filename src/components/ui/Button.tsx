import cn from 'classnames';
import classes from './Button.module.scss';

const Button: React.FC<{
  id?: string;
  className?: string;
  onClick?: () => void;
  customClasses?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}> = ({
  children,
  id,
  className = 'button-dark',
  onClick,
  disabled = false,
  type,
  customClasses,
}) => {
  const buttonClasses = !!customClasses ? customClasses : classes[className];

  return (
    <button
      id={id}
      className={cn(buttonClasses, classes[buttonClasses!])}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
