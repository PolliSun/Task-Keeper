import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { IoBookOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { isLogin } = useCurrentUser();

  const handleNavigation = () => {
    navigate("/");
  };

  const handleNavigationLogin = () => {
    navigate("/login");
  };

  const handleNavigationProfile = () => {
    navigate("/profile");
  };

  return (
    <header className={styles.header}>
      <a onClick={handleNavigation} className={styles.link}>
        <IoBookOutline size={40} />
        <h1 className={styles.title}>Task Keeper</h1>
      </a>
      {isLogin ? (
        <a onClick={handleNavigationProfile} className={styles.link}>
          <CgProfile size={30} />
        </a>
      ) : (
        <a onClick={handleNavigationLogin} className={styles.link}>
          <FiLogIn size={30} />
        </a>
      )}
    </header>
  );
};
