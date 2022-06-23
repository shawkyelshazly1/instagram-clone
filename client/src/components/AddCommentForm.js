import React, { useState } from "react";

export default function AddCommentForm() {
  const [comment, setComment] = useState("");

  return (
    <form className="flex flex-row border-t-[1px] w-full px-4 ">
      <textarea
        type="text"
        onChange={(e) => setComment(e.target.value.trim())}
        className=" w-full py-2 px-2  focus:outline-none resize-none"
        rows={1}
        placeholder="Add Comment..."
      />
      <button
        className={` ${
          comment !== ""
            ? "text-blue-500 font-medium"
            : "text-blue-300 cursor-default"
        }`}
      >
        Post
      </button>
    </form>
  );
}
