import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/user";
import AuthPage from "../pages/AuthPage";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import CreatePostModal from "../components/CreatePostModal";

export default function PrivateRouter({ children }) {
  const [showModal, setShowModal] = useState(false);

  const { data, loading } = useQuery(CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  //

  if (loading) return null;
  if (!data) return <AuthPage />;

  return (
    <div className="flex flex-1 flex-col w-full ">
      <Navbar setShowModal={setShowModal} />
      <div className="flex justify-center  pt-[6rem] bg-gray-100 min-h-screen">
        {children}
      </div>
      <CreatePostModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
