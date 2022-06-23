import { useQuery } from "@apollo/client";
import React from "react";
import { CURRENT_USER } from "../graphql/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { data, loading } = useQuery(CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return null;
  return (
    <div className="items-center justify-center text-center bg-white shadow-md py-3 flex flex-row gap-16 overflow-hidden  fixed top-0 w-full">
      <h1 className="text-lg font-PottaOne text-slate-500">Instagram Clone</h1>
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-100 rounded-2xl px-4 py-2"
      />
      <div className="flex flex-row gap-3 items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} className="text-2xl cursor-pointer" />
        </Link>
        <Link to="/messages">
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="text-2xl cursor-pointer"
          />
        </Link>
        <Link to="/messages">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="text-2xl cursor-pointer"
          />
        </Link>
        <Link to={`/${data.currentUser.username}/`}>
          <div>
            <img
              className="rounded-sm w-[2rem] h-[2rem] cursor-pointer"
              src={data.currentUser.avatar}
              alt={data.currentUser.username}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
