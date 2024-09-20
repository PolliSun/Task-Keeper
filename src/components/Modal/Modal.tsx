import React from "react";
import ReactDOM from "react-dom";
import './modal.css';

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {


  return ReactDOM.createPortal(
    <div className="modal_overlay">
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close_button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
  /* return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal_close_button} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  ); */
};
