import { FC } from "react";
import styles from "./forgot-password.module.css";
import { WrepperNoteLeftUI } from "../../wrepper-note-left/wrepper-note-left";

type ForgotPasswordUIProps = {
  email: string;
  onSubmit: (email: string) => void;
  onEmailChange: (email: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const ForgotPasswordUI: FC<ForgotPasswordUIProps> = ({
  email,
  onSubmit,
  onEmailChange,
  isLoading,
  error,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };
  return (
    <WrepperNoteLeftUI title={"Восстановление пароля"}>
      <form
        name="forgot-password"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <p className={styles.info}>
          Введите email, который вы использовали при регистрации и мы вышлем
          инструкцию по восстановлению пароля.
        </p>
        <div className={styles.field_container}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            value={email}
            placeholder="Ваш email"
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.forgot_button} disabled={isLoading}>
          {isLoading ? "Восстановление..." : "Восстановить пароль"}
        </button>
      </form>
    </WrepperNoteLeftUI>
  );
};
