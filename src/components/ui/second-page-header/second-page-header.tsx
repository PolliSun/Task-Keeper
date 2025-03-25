import { FC } from "react";
import styles from "./second-page-header.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";

type SecondPageHeaderUIProps = {
  onClose: () => void;
  isDisabled: boolean;
};

export const SecondPageHeaderUI: FC<SecondPageHeaderUIProps> = ({
  onClose,
  isDisabled,
}) => {
  return (
    <>
      <div className={styles.navContainer}>
        <button
          className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
          onClick={isDisabled ? undefined : onClose}
        >
          <IoCloseCircleOutline size={18} />
        </button>
      </div>
    </>
  );
};
