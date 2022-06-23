import React from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/user";
import AuthPage from "../pages/AuthPage";
import Navbar from "../components/Navbar";

export default function PrivateRouter({ children }) {
  const { data, loading } = useQuery(CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return null;
  console.log(data);
  if (!data) return <AuthPage />;

  return (
    <div className="flex flex-1 flex-col w-full">
      <Navbar /> 
      <div className="flex justify-center mt-[4rem] pt-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
