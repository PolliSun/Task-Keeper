import { FC } from "react";
import { ResetPassword } from "../../../../utils/api/userService/userService";
import styles from "./reset-password.module.css";
import { WrepperNoteLeftUI } from "../../wrepper-note-left/wrepper-note-left";

type ResetPasswordUIProps = {
  resetPassword: ResetPassword;
  onSubmit: (data: ResetPassword) => void;
  onNewPasswordChange: (newPassword: string) => void;
  onReNewPasswordChange: (reNewPassword: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  resetPassword,
  onSubmit,
  onNewPasswordChange,
  onReNewPasswordChange,
  isLoading,
  error,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resetPassword);
  };
  return (
    <WrepperNoteLeftUI title={"Сброс пароля"}>
      <form name="reset-password" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_container}>
          <label className={styles.label} htmlFor="newPassword">
            Email
          </label>
          <input
            className={styles.input}
            id="newPassword"
            type="password"
            value={resetPassword.newPassword}
            placeholder="Введите новый пароль"
            onChange={(e) => onNewPasswordChange(e.target.value)}
          />
        </div>
        <div className={styles.field_container}>
          <label className={styles.label} htmlFor="reNewPassword">
            Пароль
          </label>
          <input
            className={styles.input}
            id="reNewPassword"
            type="password"
            value={resetPassword.reNewPassword}
            placeholder="Повторите новый пароль"
            onChange={(e) => onReNewPasswordChange(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.reset_button} disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить новый пароль"}
        </button>
      </form>
    </WrepperNoteLeftUI>
  );
};
