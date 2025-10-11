import { FC } from "react";
import styles from "./sign-up.module.css";
import { WrepperNoteLeftUI } from "../../wrepper-note-left/wrepper-note-left";

type EmailConfirmationUIProps = {
  onClose: () => void;
};

export const EmailConfirmationUI: FC<EmailConfirmationUIProps> = ({
  onClose,
}) => {
  return (
    <WrepperNoteLeftUI title={"Почти готово!"}>
      <div className={styles.form}>
        Мы отправили письмо с подтверждением на ваш email. Откройте письмо и
        нажмите "Подтвердить аккаунт". Если письма нет во входящих, проверьте
        папку "Спам".
      </div>
      <button className={styles.close_button} onClick={onClose}>
        закрыть
      </button>
    </WrepperNoteLeftUI>
  );
};
