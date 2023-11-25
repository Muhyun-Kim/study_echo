"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Memo = {
  id: number;
  title: string;
  detail: string;
  createdAt: string;
};

export default function MemoDetail() {
  const [memo, setMemo] = useState<Memo | null>(null);
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await fetch(`http://localhost:1323/memos/${id}`);
        if (!response.ok) {
          throw new Error("Memo not found");
        }
        const data: Memo = await response.json();
        setMemo(data);
        setMemo(data);
        setTitle(data.title);
        setDetail(data.detail);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMemo();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:1323/memos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, detail }),
      });
      if (!response.ok) {
        throw new Error("Memo update failed");
      }
      console.log("Memo updated successfully");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("本当に削除しますか？")) return;

    try {
      const response = await fetch(`http://localhost:1323/memos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Memo deletion failed");
      }
      console.log("Memo deleted successfully");
      router.push("/");
    } catch (e: unknown) {}
  };

  return (
    <div className="m-8 w-96">
      <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
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
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 w-1/3 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          >
            update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 w-1/3 bg-red-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          >
            delete
          </button>
        </div>
      </form>
    </div>
  );
}
