import { useRouter } from "next/router";
import classes from "./AuthRouting.module.scss";

export default function AuthRouting() {
    const router = useRouter();
    const currentForm = router.query.form as string;

    const authFormChangeHandler = (newSection: string) => {
        router.push(newSection);
    };

    return (
        <div className={classes.controls}>
            {currentForm !== "register" && (
                <button
                    id="formSwitchButton-Register"
                    onClick={authFormChangeHandler.bind(null, "register")}
                    className="text-sm"
                >
                    Зареєструватися
                </button>
            )}
            {currentForm !== "login" && (
                <button
                    id="formSwitchButton-Login"
                    onClick={authFormChangeHandler.bind(null, "login")}
                    className="text-sm"
                >
                    Увійти
                </button>
            )}
            {currentForm !== "forgot-password" && (
                <button
                    id="formSwitchButton-forget"
                    onClick={authFormChangeHandler.bind(
                        null,
                        "forgot-password"
                    )}
                    className="text-sm"
                >
                    Забули пароль?
                </button>
            )}
            {currentForm !== "activate-account" ? (
                <button
                    id="formSwitchButton-activate"
                    onClick={authFormChangeHandler.bind(
                        null,
                        "activate-account"
                    )}
                    className="text-sm"
                >
                    {"Активувати акаунт"}
                </button>
            ) : null}
        </div>
    );
};
