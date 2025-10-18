import { FC, useState } from "react";
import { SignInUI } from "../../components/ui/pages/sign-In/sign-In";
import { LoginData } from "../../utils/api/userService/userService";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";

export const Login: FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signIn } = useCurrentUser();

  const handleSubmit = (data: LoginData) => {
    signIn.mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  const onEmailChange = (email: string) => {
    setLoginData({ ...loginData, email });
  };

  const onPasswordChange = (password: string) => {
    setLoginData({ ...loginData, password });
  };

  const onRegisterClick = () => {
    navigate("/register");
  };

  const onForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <SignInUI
      login={loginData}
      onSubmit={handleSubmit}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      isLoading={signIn.isPending}
      error={signIn.error?.message}
      onLinkRegister={onRegisterClick}
      onLinkForgotPassword={onForgotPasswordClick}
    />
  );
};
