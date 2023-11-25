"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:1323/memo/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, detail }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setSuccessMessage("success to upload message");
    } catch (err) {
      console.error("failed to submit memo :", err);
    }
  };

  const handleOkClick = () => {
    router.push("/");
  };

  return (
    <div className="m-8 w-96">
      {successMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-white">{successMessage}</p>
            <button
              onClick={handleOkClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <textarea
          name="detail"
          placeholder="Detail"
          required
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
