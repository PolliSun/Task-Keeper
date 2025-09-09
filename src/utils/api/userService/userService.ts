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
  logout: () => Promise<void>;
  getUser: () => Promise<{ data: User }>;
  updateUser: ({ username, avatar_url }: UpdateUser) => Promise<{ data: User }>;
  refreshToken: () => Promise<{ success: boolean }>;
  register: ({ email, password }: RegisterData) => Promise<{ data: User }>;
}

export const userService = new userServiceReal();
