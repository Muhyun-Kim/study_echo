"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";

type Memo = {
  id: number;
  title: string;
  detail: string;
  created_at: string;
};

function formatCreatedAt(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().substring(2); // '23'
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // '11'
  const day = date.getDate().toString().padStart(2, "0"); // '23'
  const hour = date.getHours().toString().padStart(2, "0"); // '01'
  const minute = date.getMinutes().toString().padStart(2, "0"); // '52'

  return `${year}/${month}/${day} ${hour}:${minute}`;
}

export default function Home() {
  const [memos, setMemo] = useState<Memo[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:1323/memos");
        const data: Memo[] = await response.json();
        console.log(data);
        setMemo(data);
      } catch (error) {
        console.error("백엔드에서 데이터를 가져오는 중 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="m-4 w-1/2">
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
                {formatCreatedAt(memo.created_at)}
              </p>
            </li>
          </NextLink>
        ))}
      </ul>
    </div>
  );
}
