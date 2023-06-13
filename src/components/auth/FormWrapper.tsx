import { type ReactNode } from "react";
import AuthRouting from "./AuthRouting";
import classes from "./FormWrapper.module.scss";

export default function FormWrapper({
  children,
  withRouting = true,
}: {
  children: ReactNode;
  withRouting?: boolean;
}) {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title} id="authFormTitle">
        CareerHub
      </h3>
      {children}
      {withRouting ? <AuthRouting /> : null}
    </div>
  );
}
