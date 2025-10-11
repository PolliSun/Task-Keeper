import { FC } from "react";
import styles from "./sign-In.module.css";
import { LoginData } from "../../../../utils/api/userService/userService";
import { WrepperNoteLeftUI } from "../../wrepper-note-left/wrepper-note-left";

type SignInUIProps = {
  login: LoginData;
  onSubmit: (data: LoginData) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  onLinkRegister: () => void;
  onLinkForgotPassword: () => void;
};

export const SignInUI: FC<SignInUIProps> = ({
  login,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  isLoading = false,
  error = null,
  onLinkRegister,
  onLinkForgotPassword,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(login);
  };

  return (
    <WrepperNoteLeftUI title={"Вход в Task Keeper"}>
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
        <span className={styles.forgot_password} onClick={onLinkForgotPassword}>
          Забыли пароль?
        </span>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.login_button} disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
        <div className={styles.signUp}>
          Еще нет аккаунта?
          <button
            type="button"
            onClick={onLinkRegister}
            className={styles.signUp_button}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </WrepperNoteLeftUI>
  );
};
