import React from "react";
import { Link } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";

export default function CommentsSection() {
  return (
    <>
      <div className="flex flex-col px-3 pb-2">
        <div className="flex flex-row gap-2 ">
          <Link to={`/${"Ahmed.Ali.215"}`}>
            <h1 className="font-semibold">Ahmed.Ali.215</h1>
          </Link>
          <span className="font-normal text-gray-500  min-w-full w-0 break-words overflow-hidden">
            hi this is my comment here
          </span>
        </div>
      </div>
      <span className="text-gray-500 px-3 py-2 cursor-pointer">
        view all comments
      </span>
      <AddCommentForm />
    </>
  );
}
