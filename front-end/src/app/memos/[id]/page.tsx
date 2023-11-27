"use client";

import { deleteMemo, getMemo, updateMemo } from "@/controllers/memo_controller";
import { Memo } from "@/models/memo_model";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MemoDetail() {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const data: Memo = await getMemo(id);
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
      await updateMemo(id, { title, detail });
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
      await deleteMemo(id);
      router.push("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
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
