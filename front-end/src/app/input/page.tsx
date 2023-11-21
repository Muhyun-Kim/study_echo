"use client";

export default function Input() {
  return (
    <div className="m-8 w-96">
      <form action="POST" className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <textarea
          name="detail"
          placeholder="Detail"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="submit"
          value="Submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        />
      </form>
    </div>
  );
}
