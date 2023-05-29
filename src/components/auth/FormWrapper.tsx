import { type ReactNode } from "react";
import AuthRouting from "./AuthRouting";
import classes from "./FormWrapper.module.scss";

const FormWrapper = ({ children }: { children: ReactNode }) => (
  <div className={classes.wrapper}>
    <h3 className={classes.title} id="authFormTitle">
      CareerHub
    </h3>
    {children}
    <AuthRouting />
  </div>
);
export default FormWrapper;
