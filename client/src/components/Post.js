import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CommentsSection from "./CommentsSection";
export default function Post() {
  return (
    <div className="w-full bg-white border-[1px] border-gray-300 rounded-md">
      <Link to={`/${"Ahmed.Ali.215"}`}>
        <div className="flex flex-row gap-3 px-3 py-3 items-center">
          <img
            className="w-[2rem] h-[2rem]"
            src="https://res.cloudinary.com/dwufx31ox/image/upload/v1648152876/Foodterest/pngwing.com_5_yr4gjt.png"
            alt=""
          />
          <h1>Ahmed.Ali.215</h1>
        </div>
      </Link>
      <div className="w-[500px] min-h-[300px] items-center justify-center flex">
        <img
          className="w-fit h-fit"
          src="https://www.gettyimages.dk/gi-resources/images/500px/983794168.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-row gap-2 px-3 py-4">
        <FontAwesomeIcon icon={faHeart} className="text-2xl cursor-pointer" />
        <FontAwesomeIcon
          icon={faComment}
          className="text-2xl  cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-2xl  cursor-pointer"
        />
      </div>
      <h1 className="px-3 pb-2 font-semibold "> 7 likes</h1>
      <CommentsSection />
    </div>
  );
}
