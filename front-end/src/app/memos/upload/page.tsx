"use client";

import SuccessMessage from "@/components/successMessage";
import { uploadMemo } from "@/controllers/memo_controller";
import { Memo } from "@/models/memo_model";
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
      const newMemo: Pick<Memo, "title" | "detail"> = { title, detail };
      await uploadMemo(newMemo);
      setSuccessMessage("Successfully uploaded the memo.");
    } catch (err) {
      console.error("failed to submit memo :", err);
    }
  };

  const handleOkClick = () => {
    setSuccessMessage("");
    router.push("/");
  };

  return (
    <div className="m-8 w-96">
      {successMessage && (
        <SuccessMessage message={successMessage} onOkClick={handleOkClick} />
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
