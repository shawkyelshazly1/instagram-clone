import React from "react";

export default function AuthPage() {
  return (
    <div className="flex gap-16 flex-row flex-1 p-6 items-center justify-center  bg-slate-100">
      <h1 className="text-5xl font-semibold font-PottaOne text-gray-500">
        {" "}
        Instagram clone
      </h1>{" "}
      <div className="bg-white p-5">
        <form className="flex flex-col gap-4 w-full">
          <h1 className="mx-auto text-xl">Login</h1>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-200 py-2 px-4 rounded-2xl"
          />
          <input
            type="text"
            placeholder="Password"
            className="bg-gray-200 py-2 px-4 rounded-2xl"
          />
          <button
            type="submit"
            className="rounded-3xl bg-cyan-400 text-xl py-2 px-4"
          >
            Login
          </button>
        </form>

        <h1 className="mt-4 text-sm">
          if you don't have an account - <span>Sign Up</span>
        </h1>
      </div>
    </div>
  );
}
