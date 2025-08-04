import { FC } from "react";
import styles from "./sign-In.module.css";
import { LoginData } from "../../../../utils/api/userService/userService";

type SignInUIProps = {
    login: LoginData;
    onSubmit: (data: LoginData) => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    isLoading?: boolean;
    error?: string | null;
};

export const SignInUI: FC<SignInUIProps> = ({
    login,
    onSubmit,
    onEmailChange,
    onPasswordChange,
    isLoading = false,
    error = null,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(login);
    };

    return (
        <div className={styles.wrepper}>
            <div className={styles.content}>
                <p className={styles.title}>Вход в Task Keeper</p>
                <div className={styles.noteBookHoles}>
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className={styles.hole} />
                    ))}
                </div>
                <form name="sign-in" onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field_container}>
                        <label className={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={styles.input}
                            id="email"
                            type="email"
                            value={login.email}
                            placeholder="Введите ваш email"
                            onChange={(e) => onEmailChange(e.target.value)}
                        />
                    </div>
                    <div className={styles.field_container}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        <input
                            className={styles.input}
                            id="password"
                            type="password"
                            value={login.password}
                            placeholder="Введите пароль"
                            onChange={(e) => onPasswordChange(e.target.value)}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button className={styles.login_button} disabled={isLoading}>
                        {isLoading ? "Вход..." : "Войти"}
                    </button>
                    <div className={styles.signUp}>
                        Еще нет аккаунта?
                        <button type="button" className={styles.signUp_button}>Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
