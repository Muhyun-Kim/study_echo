import { default_url } from "@/global";
import { Memo } from "@/models/memo_model";

export const fetchMemos = async (): Promise<Memo[]> => {
  const response = await fetch(`${default_url}/memos`);
  if (!response.ok) {
    throw new Error("Failed to fetch memos");
  }
  return response.json();
};

export const uploadMemo = async (
  memo: Pick<Memo, "title" | "detail">
): Promise<Memo> => {
  const response = await fetch(`${default_url}/memo/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

export const getMemo = async (id: string | string[]): Promise<Memo> => {
  const response = await fetch(`${default_url}/memos/${id}`);
  if (!response.ok) {
    throw new Error("Memo not found");
  }
  return response.json();
};

export const updateMemo = async (
  id: string | string[],
  memo: Pick<Memo, 'title' | 'detail'>
): Promise<void> => {
  const response = await fetch(`${default_url}/memos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error('Memo update failed');
};

export const deleteMemo = async (id: string | string[]) => {
  const response = await fetch(`${default_url}/memos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Memo deletion failed");
  console.log("success to delete")
};