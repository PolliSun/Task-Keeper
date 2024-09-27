import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import closeButton from "../../images/closeButton.svg";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <img 
              src={closeButton}
              alt="Кнопка закрытия"
              className={styles.closeButton} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
};
