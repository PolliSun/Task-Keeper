import {
  LoginData,
  RegisterData,
  UpdateUser,
  User,
  userService,
} from "./userService";
import { supabase } from "../../serviceFuncs/supabaseClient";

export class userServiceReal implements userService {
  async login({ email, password }: LoginData): Promise<{ data: User }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Ошибка при входе");
    }

    if (!data.user) {
      throw new Error("Пользователь не найден");
    }

    return {
      data: {
        userId: data.user.id,
        created_at: data.user.created_at,
        username: data.user.user_metadata?.username || data.user.email || email,
        avatar_url: data.user.user_metadata?.avatar_url || "",
      },
    };
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || "Ошибка при выходе");
    }
  }

  async getUser(): Promise<{ data: User }> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message || "Ошибка получения пользователя");
    }

    if (!user) {
      throw new Error("Пользователь не авторизован");
    }

    return {
      data: {
        userId: user.id,
        created_at: user.created_at,
        username: user.user_metadata.username || user.email || "",
        avatar_url: user.user_metadata?.avatar_url || "",
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

  async refreshToken(): Promise<void> {
    const { error } = await supabase.auth.refreshSession();

    if (error) {
      throw new Error(error.message || "Ошибка обновления сессии");
    }
  }

  async register({
    email,
    password,
  }: RegisterData): Promise<{ data: User }> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw new Error(error.message || "Ошибка при регистрации");
    }

    if (!data.user) {
      throw new Error("Не удалось создать пользователя");
    }

    const userName = `user_${Math.floor(Math.random() * 1000)}`;
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: data.user?.id,
          username: userName,
        },
      ])
      .select()
      .single();

    if (userError) {
      throw new Error(userError.message || "Ошибка создания профиля");
    }

    return {
      data: {
        userId: userData.userId,
        created_at: userData.created_at,
        username: userData.username,
        avatar_url: userData.avatar_url || "",
      },
    };
  }
}
