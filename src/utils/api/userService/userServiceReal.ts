import {
  LoginData,
  RegisterData,
  UpdateUser,
  User,
  userService,
} from "./userService";
import { supabase } from "../../serviceFuncs/supabaseClient";
const API_URL = import.meta.env.VITE_API_URL;
export class userServiceReal implements userService {
  async login({ email, password }: LoginData): Promise<{ data: User }> {
    const res = await fetch(`${API_URL}/api/auth?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const resData = await res.json();

    if (!res.ok) {
      if (resData.code === "email_not_confirmed") {
        throw new Error(
          "Пожалуйста, подтвердите ваш email адрес по ссылке в письме."
        );
      }
      if (resData.code === "invalid_credentials") {
        throw new Error("Неверный email или пароль.");
      }
      throw new Error(resData.message || "Ошибка при входе");
    }

    const { session, user } = resData;

    if (session?.access_token) {
      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("refresh_token", session.refresh_token);
    }

    return {
      data: {
        userId: user.id,
        created_at: user.created_at,
        username: user.username || user.email || email,
        avatar_url: user.avatar_url || "",
      },
    };
  }

  async logout(): Promise<void> {
    const refresh_token = localStorage.getItem("refresh_token");

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    await fetch(`${API_URL}/api/auth?action=logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`,
      },
    });
  }

  async getUser(): Promise<{ data: User }> {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message || "Ошибка получения пользователя");
    }

    return {
      data: {
        userId: resData.id,
        created_at: resData.created_at,
        username: resData.username || "",
        avatar_url: resData.avatar_url || "",
      },
    };
  }

  async updateUser({
    username,
    avatar_url,
  }: UpdateUser): Promise<{ data: User }> {
    const { data, error } = await supabase
      .from("users")
      .update({ username, avatar_url })
      .eq("id", (await supabase.auth.getUser()).data.user?.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Ошибка при редактировании");
    }

    return {
      data: {
        userId: data.id,
        created_at: data.created_at,
        username: data.username || data.email || "",
        avatar_url: data.avatar_url || "",
      },
    };
  }

  async refreshToken(): Promise<{ success: boolean }> {
    const refresh_token = localStorage.getItem("refresh_token");

    if (!refresh_token) {
      throw new Error("Refresh token не найден");
    }

    const res = await fetch(`${API_URL}/api/auth?action=refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`,
      },
    });

    if (!res.ok) {
      const resData = await res.json().catch(() => ({}));
      throw new Error(resData.message || "Ошибка обновления токена");
    }

    const resData = await res.json();

    if (resData.session) {
      localStorage.setItem("access_token", resData.session.access_token);
      localStorage.setItem("refresh_token", resData.session.refresh_token);
    }

    return { success: true };
  }

  async register({ email, password }: RegisterData): Promise<{ data: User }> {
    const res = await fetch(`${API_URL}/api/auth?action=register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const resData = await res.json();

    if (!res.ok) {
      if (resData.code === "user_already_exists") {
        throw new Error("Пользователь с таким email уже зарегистрирован.");
      }
      if (resData.code === "weak_password") {
        throw new Error(
          "Пароль слишком слабый. Используйте минимум 6 символов."
        );
      }
      throw new Error(resData.message || "Ошибка при регистрации");
    }

    const { user } = resData;

    return {
      data: {
        userId: user.id,
        created_at: user.created_at,
        username: user.username || user.email || email,
        avatar_url: user.avatar_url || "",
      },
    };
  }
}
