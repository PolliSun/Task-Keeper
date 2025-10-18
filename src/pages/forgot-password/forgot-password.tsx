import { FC, useState } from "react";
import { ForgotPasswordUI } from "../../components/ui/pages/forgot-password/forgot-password";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";
import { useNavigate } from "react-router-dom";

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useCurrentUser();
  const navigate = useNavigate();

  const onEmailChange = (email: string) => {
    setEmail(email);
  };

  const handleSubmit = (email: string) => {
    requestPasswordReset.mutate(email, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <ForgotPasswordUI
      email={email}
      onEmailChange={onEmailChange}
      onSubmit={handleSubmit}
      isLoading={requestPasswordReset.isPending}
      error={requestPasswordReset.error?.message}
    />
  );
};
