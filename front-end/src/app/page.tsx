"use client";

import { useEffect, useState } from "react";

type Memo = {
  id: number;
  title: string;
  detail: string;
  created_at: any;
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
    <div className="m-4 w-96">
      <ul>
        {/* 메시지 배열을 순회하며 각 메시지를 리스트 아이템으로 표시합니다. */}
        {memos.map((memo) => (
          <li key={memo.id}>
            <h1>{memo.title}</h1>
            <p>{memo.detail}</p>
            <p>{formatCreatedAt(memo.created_at)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
