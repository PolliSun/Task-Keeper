import { useMutation } from "@tanstack/react-query";
import { userService } from "../../api/userService/userService";
import { LoginData, User } from "../../api/userService/userService";

export const useLogin = () => {
  return useMutation<{ data: User }, Error, LoginData>({
    mutationFn: (data: LoginData) => userService.login(data),
  });
};
