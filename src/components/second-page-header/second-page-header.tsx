import { FC } from "react";
import { SecondPageHeaderUI } from "../ui/second-page-header/second-page-header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SecondPageHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/dashboard");
  };

  const isDisabled = location.pathname === "/";

  return (
    <SecondPageHeaderUI onClose={handleCloseClick} isDisabled={isDisabled} />
  );
};
