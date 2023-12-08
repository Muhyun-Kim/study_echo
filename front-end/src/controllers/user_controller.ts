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

export const loginUser = async (
  user: Pick<User, "userName" | "password">
): Promise<User> => {
  const response = await fetch(`${default_url}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.status}`);
  }else{
    return response.json();
  }
};
