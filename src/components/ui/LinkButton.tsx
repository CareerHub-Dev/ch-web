import Link from "next/link";
import cn from "classnames";
import classes from "./LinkButton.module.scss";

const LinkButton: React.FC<{
  link?: string;
  onClick?: AnyFn;
  style?:
    | "dark-blue-primary"
    | "light-blue-primary"
    | "dark-blue-secondary"
    | "lgbt";
  additionalClasses?: string | Array<string>;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({
  link,
  onClick,
  style = "dark-blue-primary",
  additionalClasses,
  children,
  disabled = false,
}) => {
  const allClasses = cn(
    classes[style],
    additionalClasses,
    disabled && classes.disabled
  );

  if (link) {
    return (
      <Link href={link} className={allClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default LinkButton;
