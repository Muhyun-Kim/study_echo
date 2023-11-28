import { default_url } from "@/global";
import { User } from "@/models/user_model";

export const createUser = async (
  user: Pick<User, "userName" | "password">
): Promise<User> => {
  const response = await fetch(`${default_url}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};
