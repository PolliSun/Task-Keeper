import React from "react";
import ReactDOM from "react-dom";
import '../styles/modal.css';

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
};
