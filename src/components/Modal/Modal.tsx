import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import iconClose from "../../images/close.svg";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.button} onClick={onClose}>
            <img
              src={iconClose}
              alt="Кнопка закрытия"
              className={styles.iconClose}
            />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
};
