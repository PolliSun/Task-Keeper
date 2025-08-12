import { FC } from "react";
import { User } from "../../../../utils/api/userService/userService";
import styles from "./profile.module.css";

type ProfileUIProps = {
  user: User;
  onEdit: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onLogout: () => void;
  isEdit?: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarClick: () => void;
};

export const ProfileUI: FC<ProfileUIProps> = ({
  user,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isEdit,
  onLogout,
  fileInputRef,
  onAvatarClick,
}) => {
  return (
    <div className={styles.wrepper}>
      <div className={styles.noteBookHoles}>
        {[...Array(7)].map((_, index) => (
          <div key={index} className={styles.hole} />
        ))}
      </div>
      <div className={styles.profile}>

        {isEdit ? (
          <>
            <input type='file' name='avatar' accept="image/*" className={styles.input_avatar} ref={fileInputRef}></input>
            <div className={styles.container_avatar} onClick={onAvatarClick}>
              <p className={styles.avatar_text}>
                Загрузите аватар
              </p>
              <button className={styles.avatar_button}>+</button>
            </div>
          </>
        ) : (
          <div className={styles.avatar}>{user.avatar_url}</div>
        )}
        <div className={styles.info}>
          <div className={styles.data_container}>
            <div className={styles.field_container}>
              <span className={styles.field_name}>Имя пользователя:</span>
              {isEdit ? (
                <input type='text' name='username' placeholder="Введите ваше имя" className={styles.input_text} maxLength={25}></input>
              ) : (
                <p className={styles.field_text}>{user.username}</p>
              )}
            </div>
            <div className={styles.field_container}>
              <span className={styles.field_name}>Дата регистрации:</span>
              <p className={`${styles.field_text} ${isEdit ? styles.disabled : ''}`}>{user.created_at}</p>
            </div>
          </div>
          <div className={styles.container_edit}>
            {isEdit ? (
              <>
                <button className={`${styles.button} ${styles.button_save}`} onClick={onSave}>
                  сохранить
                </button>
                <button className={`${styles.button} ${styles.button_cancel}`} onClick={onCancel}>
                  отменить
                </button>
              </>
            ) : (
              <>
                <button className={`${styles.button} ${styles.button_edit}`} onClick={onEdit}>
                  редактировать
                </button>
                <button className={`${styles.button} ${styles.button_logout}`} onClick={onLogout}>
                  выйти
                </button>
              </>
            )}
          </div>

        </div>
        {!isEdit &&
          <button className={styles.button_delete} onClick={onDelete}>удалить аккаунт</button>}
      </div>
    </div>
  );
};
