import { FC, useState } from "react";
import { SignInUI } from "../../components/ui/pages/sign-In/sign-In";
import { LoginData } from "../../utils/api/userService/userService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export const Login: FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // const { mutate: login, isPending, error } = useLogin();

  const { signIn } = useUser();

  const handleSubmit = (data: LoginData) => {
    signIn.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const onEmailChange = (email: string) => {
    setLoginData({ ...loginData, email });
  };

  const onPasswordChange = (password: string) => {
    setLoginData({ ...loginData, password });
  };

  return (
    <SignInUI
      login={loginData}
      onSubmit={handleSubmit}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      isLoading={signIn.isPending}
      error={signIn.error?.message}
    />
  );
};
