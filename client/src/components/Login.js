import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/auth";
import { CURRENT_USER } from "../graphql/user";
import { setAccessToken } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ setComponent }) {
  // useNavigate & useLocation APIs
  const navigate = useNavigate();
  const location = useLocation();

  // creating form data object with state change
  const [formData, setFormData] = useState({ username: "", password: "" });

  // setting errors state
  const [errors, setErrors] = useState("");

  // login graphql mutation
  const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER, {
    onError(error) {
      setErrors(error.message);
    },
    onCompleted(data) {
      if (data && data.login.accessToken !== "") {
        setErrors("");
        setAccessToken(data.login.accessToken);
      }
    },
    update(cache, { data }) {
      if (!data) {
        return null;
      }

      cache.writeQuery({
        query: CURRENT_USER,
        data: { currentUser: data.login.user },
      });

      // // Navigating user back to previous URL
      // if (location.pathname !== "/") {
      //   navigate(location.pathname);
      // } else {
      //   navigate("/");
      // }
    },
  });

  // handle input change on fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleFormSubmission = (e) => {
    setErrors("");
    e.preventDefault();
    loginUser({ variables: { ...formData } });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <h1 className="mx-auto text-xl">Login</h1>
        <input
          required
          name="username"
          type="text"
          placeholder="Username"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="submit"
          className="rounded-3xl bg-cyan-400 text-xl py-2 px-4"
        >
          Login
        </button>
        {errors === "" ? (
          <></>
        ) : (
          <ul className="list-disc flex pl-6 text-red-600">
            <li>{errors}</li>
          </ul>
        )}
      </form>
      <h1 className="mt-4 text-sm">
        if you don't have an account -{" "}
        <span
          className="text-blue-600 cursor-pointer font-medium"
          onClick={() => {
            setComponent("signup");
          }}
        >
          Sign Up
        </span>
      </h1>
    </div>
  );
}
