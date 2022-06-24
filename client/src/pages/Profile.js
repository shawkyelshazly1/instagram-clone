import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CURRENT_USER,
  FOLLOW_OR_UNFOLLOW_USER,
  LOAD_USER_PROFILE,
} from "../graphql/user";
import LoadingComponent from "../components/reusable/LoadingComponent";

export default function Profile() {
  let { username } = useParams();
  const navigate = useNavigate();

  // Loading current use from cached data
  const {
    data: { currentUser },
  } = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-only",
  });

  // follow or unfollow user mutation

  const [followOrUNfollowUser] = useMutation(FOLLOW_OR_UNFOLLOW_USER, {
    variables: { username },
  });

  // load user profile
  const { data, loading, error } = useQuery(LOAD_USER_PROFILE, {
    variables: { username },
    onCompleted({ loadUserProfile }) {
      if (!loadUserProfile.id) {
        navigate("/");
      }
    },
    onError(error) {
      if (error) {
        navigate("/");
      }
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-1/2 items-center flex flex-col gap-6">
      <div className="flex flex-row  w-3/4 items-center justify-center gap-10">
        <div>
          <img
            className="w-[10rem] h-[10rem] border-[4px] rounded-full border-gray-400 p-1"
            src={data.loadUserProfile.avatar}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-row gap-2 items-center">
            <h1 className=" text-3xl ">{data.loadUserProfile.username}</h1>

            {data.loadUserProfile.id !== currentUser.id ? (
              <>
                <button className=" text-black px-6 rounded-md font-semibold py-1 border-[1px] border-gray-400">
                  Message
                </button>
                {data.loadUserProfile.followed ? (
                  <button
                    className="bg-red-600 text-white px-6 rounded-md font-semibold py-1"
                    onClick={() => {
                      followOrUNfollowUser();
                    }}
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    className="bg-sky-600 text-white px-6 rounded-md font-semibold py-1"
                    onClick={() => {
                      followOrUNfollowUser();
                    }}
                  >
                    Follow
                  </button>
                )}
              </>
            ) : (
              <button className=" text-black px-6 rounded-md font-semibold py-1 border-[1px] border-gray-400">
                Edit Profile
              </button>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h1>
              <span className="font-semibold">66</span> posts
            </h1>
            <h1>
              {" "}
              <span className="font-semibold">
                {data.loadUserProfile.followersCount}
              </span>{" "}
              followers
            </h1>
            <h1>
              {" "}
              <span className="font-semibold">
                {data.loadUserProfile.followingsCount}
              </span>{" "}
              following
            </h1>
          </div>
          <h1 className="font-semibold">
            {data.loadUserProfile.firstName} {data.loadUserProfile.lastName}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-t-2 border-gray-300 pt-6 w-full">
        {data.loadUserProfile.posts.map((post) => (
          <Link to={`/p/${post.id}`} key={post.id}>
            <div>
              <img src={post.image} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
