import { FC } from "react";
import styles from "./sign-up.module.css";
import { RegisterData } from "../../../../utils/api/userService/userService";
import { WrepperNoteLeftUI } from "../../wrepper-note-left/wrepper-note-left";

type SignUpUIProps = {
  register: RegisterData;
  onSubmit: (data: RegisterData) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  onLogin: () => void;
};

export const SignUpUI: FC<SignUpUIProps> = ({
  register,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  isLoading,
  error,
  onLogin,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(register);
  };
  return (
    <WrepperNoteLeftUI title={"Регистрация в Task Keeper"}>
      <form name="register" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_container}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            value={register.email}
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
            value={register.password}
            placeholder="Введите пароль"
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.register_button} disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
        <div className={styles.exit}>
          Уже есть аккаунта?
          <button
            type="button"
            onClick={onLogin}
            className={styles.exit_button}
          >
            Войти
          </button>
        </div>
      </form>
    </WrepperNoteLeftUI>
  );
};
