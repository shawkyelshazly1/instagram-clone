import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/user";
import AuthPage from "../pages/AuthPage";

export default function PrivateRouter() {
  const location = useLocation();

  const { data, loading } = useQuery(CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return null;
  if (!data) return <AuthPage />;

  return <div>PrivateRouter</div>;
}
