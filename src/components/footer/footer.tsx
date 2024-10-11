import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./footer.module.css";

export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <h1 className={styles.title}>Note Keeper @2024</h1>
        </footer>
    )
}