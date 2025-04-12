import { LoginData, User, userService } from "./userService";

export class userServiceReal implements userService {
  async login({ email, password }: LoginData): Promise<{ data: User }> {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Ошибка при входе");
    }

    const data = await response.json();
    return { data };
  }
}
