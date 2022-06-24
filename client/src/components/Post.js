import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import { useMutation } from "@apollo/client";
import { LIKE_OR_UNLIKE_POST } from "../graphql/post";

export default function Post({ post }) {
  const [magicHeart, setMagicHeart] = useState(false);

  const [LikeOrUnlikePost] = useMutation(LIKE_OR_UNLIKE_POST, {
    variables: { postId: post.id },
  });

  return (
    <div className="w-full h-full bg-white border-[1px] border-gray-300 rounded-md">
      <Link to={`/${post.author.username}`}>
        <div className="flex flex-row gap-3 px-3 py-3 items-center">
          <img className="w-[2rem] h-[2rem]" src={post.author.avatar} alt="" />
          <h1>{post.author.username}</h1>
        </div>
      </Link>
      <div
        className="w-[500px] max-h-[500px] items-center justify-center flex"
        onDoubleClick={(e) => {
          if (!post.liked) {
            LikeOrUnlikePost();
            setMagicHeart(true);
            setTimeout(() => {
              setMagicHeart(false);
            }, 350);
          }
        }}
      >
        {magicHeart ? (
          <FontAwesomeIcon
            icon={faSolidHeart}
            className="absolute text-9xl cursor-pointer text-gray-200 opacity-90"
          />
        ) : (
          <></>
        )}
        <img className="max-h-[500px] w-full" src={post.image} alt="" />
      </div>
      <div className="flex flex-row gap-2 px-3 py-4">
        {post.liked ? (
          <FontAwesomeIcon
            icon={faSolidHeart}
            className="text-2xl cursor-pointer text-red-500"
            onClick={() => {
              LikeOrUnlikePost();
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            className="text-2xl cursor-pointer"
            onClick={() => {
              LikeOrUnlikePost();
            }}
          />
        )}

        <FontAwesomeIcon
          icon={faComment}
          className="text-2xl  cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-2xl  cursor-pointer"
        />
      </div>

      <h1 className="px-3 pb-2 font-semibold "> {post.likesCount} likes</h1>
      <h1 className="px-3 pb-2 font-semibold "> {post.caption} </h1>
      <CommentsSection commentsCount={post.commentsCount} postId={post.id} />
    </div>
  );
}
