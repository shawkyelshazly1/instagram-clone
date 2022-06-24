import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_COMMENT } from "../graphql/post";

export default function AddCommentForm({ postId, setLastAddedComment }) {
  const [comment, setComment] = useState("");

  // add comment mutation
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT, {
    onCompleted(data) {
      if (data.addComment) {
        setLastAddedComment(data.addComment);
      }
    },
  });

  // handle adding comment form submission
  const handleFormSubmission = (e) => {
    e.preventDefault();
    addComment({ variables: { content: comment, postId } });
    setComment("");
    e.target[0].value = "";
  };

  return (
    <form
      className="flex flex-row border-t-[1px] w-full px-4 "
      onSubmit={(e) => handleFormSubmission(e)}
    >
      <textarea
        type="text"
        onChange={(e) => setComment(e.target.value.trim())}
        className=" w-full py-2 px-2  focus:outline-none resize-none"
        rows={1}
        placeholder="Add Comment..."
      />
      <button
        disabled={comment === ""}
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
