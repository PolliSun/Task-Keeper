import React, { createContext } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  LoginData,
  RegisterData,
  User,
  userService,
} from "../utils/api/userService/userService";

type UserContextType = {
  user: User | null;
  isLogin: boolean;
  profile: UseQueryResult<{ data: User }, Error> | Record<string, never>;
  signIn:
    | UseMutationResult<{ data: User }, Error, LoginData, unknown>
    | Record<string, never>;
  logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
  register:
    | UseMutationResult<{ data: User }, Error, RegisterData, unknown>
    | Record<string, never>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLogin: false,
  profile: {},
  signIn: {},
  logout: {},
  register: {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useQueryClient();

  useQuery({
    queryKey: ["refresh-token"],
    queryFn: () => userService.refreshToken(),
    refetchInterval: 4.9 * 60 * 1000,
    retry: false,
    enabled: !!localStorage.getItem("refresh_token"),
  });

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getUser(),
    retry: false,
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 5 * 60 * 1000,
  });

  const signIn = useMutation({
    mutationFn: (variables: LoginData) => userService.login(variables),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const register = useMutation({
    mutationFn: (variables: RegisterData) => userService.register(variables),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const logout = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      client.clear();
    },
  });

  const user = profile.data?.data || null;
  const isLogin = !!profile.data;

  return (
    <UserContext.Provider
      value={{ user, isLogin, profile, signIn, logout, register }}
    >
      {children}
    </UserContext.Provider>
  );
};
