"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<{ id?: number; message?: string }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:1323/");
        const data = await response.json();
        console.log(data);
        setMessage(data);
      } catch (error) {
        console.error("백엔드에서 데이터를 가져오는 중 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>{message.message}</h1>
    </div>
  );
}
