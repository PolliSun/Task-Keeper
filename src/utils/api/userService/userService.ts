import { userServiceReal } from "./userServiceReal";

export type User = {
  userId: string;
  created_at: string;
  username: string;
  avatar_url: string;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface UpdateUser {
  username?: string;
  avatar_url?: string;
}

export interface userService {
  login: ({ email, password }: LoginData) => Promise<{ data: User }>;
}

export const userService = new userServiceReal();
