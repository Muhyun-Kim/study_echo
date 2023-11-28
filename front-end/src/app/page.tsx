"use client";

import { fetchMemos } from "@/controllers/memo_controller";
import { Memo } from "@/models/memo_model";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function formatCreatedAt(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minute}`;
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [sortNewest, setSortNewest] = useState<boolean>(true);

  useEffect(() => {
    async function getMemos() {
      const data = await fetchMemos();
      setMemos(data);
    }
    getMemos();
  }, []);

  const handleSortChange = () => {
    setSortNewest(!sortNewest);
    setMemos((prevMemos) => {
      return [...prevMemos].sort((a, b) => {
        console.log("a:", a, "b:", b);
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortNewest ? dateB - dateA : dateA - dateB;
      });
    });
  };

  return (
    <div className="m-4 w-1/2">
      <button
        className="mb-4 px-4 py-1 rounded-lg border border-slate-200 bg-slate-800"
        onClick={handleSortChange}
      >
        {sortNewest ? "昇順" : "降順"}
      </button>
      <ul className="flex">
        {memos.map((memo) => (
          <NextLink
            href={`/memos/${memo.id}`}
            className="mr-4 p-4 w-1/3 rounded-lg border border-slate-200 bg-slate-800 text-white"
          >
            <li key={memo.id}>
              <h1 className="mb-4 py-1 px-2 font-bold rounded-md bg-slate-600">
                {memo.title}
              </h1>
              <p className="my-4 py-1 px-2 rounded-md bg-slate-600">
                {memo.detail}
              </p>
              <p className="mt-4 py-1 px-2 rounded-md bg-slate-600 text-xs">
                {formatCreatedAt(memo.created_at ?? "")}
              </p>
            </li>
          </NextLink>
        ))}
      </ul>
    </div>
  );
}
