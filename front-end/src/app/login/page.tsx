"use client";

import { loginUser } from "@/controllers/user_controller";
import { User } from "@/models/user_model";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user: Pick<User, "userName" | "password"> = {
        userName,
        password,
      };
      const loggedInUser = await loginUser(user);
      setUser(loggedInUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-8 w-96">
      <form
        onSubmit={handleLogin}
        action="POST"
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="id"
          placeholder="ID"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="text"
          name="password"
          placeholder="PASSWORD"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="submit"
          value="login"
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        />
      </form>
    </div>
  );
}
