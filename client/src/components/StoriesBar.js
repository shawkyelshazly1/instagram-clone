import React from "react";
import UserStory from "./UserStory";
export default function StoriesBar() {
  return (
    <div className="flex flex-row gap-2 w-2/3  overflow-x-auto overflow-y-hidden  whitespace-nowrap p-2 justify-center">
      <UserStory />
      <UserStory />
      <UserStory />
    </div>
  );
}
