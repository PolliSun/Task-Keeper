import { FC } from "react";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  component: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ component }) => {
  const { isLogin, profile } = useCurrentUser();

  if (profile.isLoading) {
    return <div>Загрузка...</div>;
  }

  return isLogin ? <>{component}</> : <Navigate to="/login" />;
};
