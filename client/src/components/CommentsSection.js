import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";

export default function CommentsSection({ commentsCount, postId }) {
  const [lastAddedComment, setLastAddedComment] = useState(null);

  return (
    <>
      {lastAddedComment !== null ? (
        <div className="flex flex-col px-3 pb-2">
          <div className="flex flex-row gap-2 ">
            <Link to={`/${lastAddedComment.author.username}`}>
              <h1 className="font-semibold">
                {lastAddedComment.author.username}
              </h1>
            </Link>
            <span className="font-normal text-gray-500  min-w-full w-0 break-words overflow-hidden">
              {lastAddedComment.content}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}

      {commentsCount === 0 ? (
        <></>
      ) : (
        <span className="text-gray-500 px-3 py-2 cursor-pointer">
          {commentsCount === 1
            ? "View 1 comment"
            : `View all ${commentsCount} comments`}
        </span>
      )}

      <AddCommentForm
        postId={postId}
        setLastAddedComment={setLastAddedComment}
      />
    </>
  );
}
