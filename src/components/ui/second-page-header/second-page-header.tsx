import React, { FC } from "react";
import styles from "./second-page-header.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";

type SecondPageHeaderUIProps = {
  title: string;
  onClose: () => void;
  onBack: () => void;
  isDisabled: boolean;
};

export const SecondPageHeaderUI: FC<SecondPageHeaderUIProps> = ({
  title,
  onClose,
  onBack,
  isDisabled,
}) => {
  return (
    <>
      <div className={styles.navContainer}>
        <button
          className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
          onClick={isDisabled ? undefined : onBack}
        >
          <IoArrowBackCircleOutline size={20} />
        </button>
        <button
          className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
          onClick={isDisabled ? undefined : onClose}
        >
          <IoCloseCircleOutline size={20} />
        </button>
      </div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </>
  );
};
