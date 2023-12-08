"use client";

import { createUser } from "@/controllers/user_controller";
import { User } from "@/models/user_model";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(()=>{
    if (password != "" && password == pwdConfirm) {
      setIsFormValid(true);
    }else{
      setIsFormValid(false);
    }
  }, [password, pwdConfirm])

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("click")
    try {
      const newUser: Pick<User, "userName" | "password"> = {
        userName,
        password,
      };
      await createUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-8 w-96">
      <form
        onSubmit={handleSignIn}
        action="POST"
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="username"
          placeholder="USERNAME"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="PASSWORD"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          name="password-confirm"
          placeholder="CONFIRM PASSWORD"
          required
          value={pwdConfirm}
          onChange={(e) => setPwdConfirm(e.target.value)}
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="submit"
          value="sign in"
          disabled={!isFormValid}
          className={`px-4 py-1 text-white rounded-md cursor-pointer ${
            isFormValid
              ? " bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 text-gray-50"
          }`}
        />
      </form>
    </div>
  );
}
