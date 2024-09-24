import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalCloseButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
};
