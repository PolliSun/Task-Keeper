import { FC, useState } from "react";
import { SignUpUI } from "../../components/ui/pages/sign-up/sign-up";
import { RegisterData } from "../../utils/api/userService/userService";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";
import { useNavigate } from "react-router-dom";
import { EmailConfirmationUI } from "../../components/ui/pages/sign-up/email-confirmation";

export const Register: FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const { register } = useCurrentUser();

  const handleSubmit = (data: RegisterData) => {
    register.mutate(data, {
      onSuccess: () => setShowConfirmation(true),
    });
  };

  const onEmailChange = (email: string) => {
    setRegisterData({ ...registerData, email });
  };

  const onPasswordChange = (password: string) => {
    setRegisterData({ ...registerData, password });
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {showConfirmation ? (
        <EmailConfirmationUI onClose={onLoginClick} />
      ) : (
        <SignUpUI
          register={registerData}
          onSubmit={handleSubmit}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          isLoading={register.isPending}
          error={register.error?.message}
          onLogin={onLoginClick}
        />
      )}
    </>
  );
};
