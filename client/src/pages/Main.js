import { useQuery } from "@apollo/client";
import React from "react";
import Post from "../components/Post";
import LoadingComponent from "../components/reusable/LoadingComponent";
import StoriesBar from "../components/StoriesBar";
import { LOAD_NEWSFEED } from "../graphql/post";

export default function Main() {
  const { data, loading, error } = useQuery(LOAD_NEWSFEED);

  if (loading) {
    return (
      <div className="flex flex-col gap-2  items-center w-1/3 ">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2  items-center w-1/3 ">
      <StoriesBar />
      <div className="flex flex-col gap-4 mt-2">
        {!loading && data.loadNewsfeed.length < 1 ? (
          <h1>You'r All Caught Up!</h1>
        ) : (
          data.loadNewsfeed.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
