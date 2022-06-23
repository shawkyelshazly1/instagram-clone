import React from "react";
import Post from "../components/Post";
import StoriesBar from "../components/StoriesBar";

export default function Main() {
  return (
    <div className="flex flex-col gap-2  items-center w-1/3 ">
      <StoriesBar />
      <div className="flex flex-col gap-4 mt-2">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
