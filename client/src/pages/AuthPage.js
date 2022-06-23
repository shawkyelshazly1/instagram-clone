import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage() {
  const [component, setComponent] = useState("login");

  return (
    <div className="flex gap-16 flex-row flex-1 p-6 items-center justify-center  bg-slate-100">
      <h1 className="text-5xl font-semibold font-PottaOne text-gray-500">
        Instagram clone
      </h1>
      <div className="bg-white p-5">
        {component === "login" ? (
          <Login setComponent={setComponent} />
        ) : (
          <Signup setComponent={setComponent} />
        )}
      </div>
    </div>
  );
}
