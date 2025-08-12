import React, { createContext, useContext, useEffect } from "react";
import { supabase } from "../utils/serviceFuncs/supabaseClient";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { LoginData, User, userService } from "../utils/api/userService/userService";

type UserContextType = {
  user: User | null;
  isLogin: boolean;
  profile: UseQueryResult<{ data: User }, Error> | Record<string, never>;
  signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
  logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLogin: false,
  profile: {},
  signIn: {},
  logout: {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useQueryClient();

  useQuery({
    queryKey: ['refresh token'],
    queryFn: () => supabase.auth.refreshSession(),
    refetchInterval: 4.9 * 60 * 1000,
    refetchIntervalInBackground: true,
    retry: false,
  })

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getUser(),
    retry: false,
  })

  const signIn = useMutation({
    mutationFn: (variables: LoginData) => userService.login(variables),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
    },
  })

  const logout = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      client.setQueriesData({ queryKey: ["profile"] }, null);
    }
  })

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          client.invalidateQueries({ queryKey: ["profile"] });
        } else if (event === 'SIGNED_OUT') {
          client.setQueryData(["profile"], null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [client]);

  const user = profile.data?.data || null;
  const isLogin = !!profile.data;

  return (
    <UserContext.Provider value={{ user, isLogin, profile, signIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
