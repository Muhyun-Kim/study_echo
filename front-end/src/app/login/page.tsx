"use client";

export default function Login() {
  return (
    <div className="m-8 w-96">
      <form action="POST" className="flex flex-col space-y-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          required
          className="px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="text"
          name="password"
          placeholder="PASSWORD"
          required
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
