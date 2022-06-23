import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/auth";

export default function Signup({ setComponent }) {
  // creating form data object with state change
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // setting errors fields
  const [errors, setErrors] = useState("");

  // useMutation register operation
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    onError(error) {
      setErrors(error.message);
    },
    onCompleted(data) {
      if (data.register) {
        setComponent("login");
        setErrors("");
      }
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
    registerUser({ variables: { ...formData } });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <h1 className="mx-auto text-xl">Sign Up</h1>
        <div className="flex flex-row gap-2">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            className="bg-gray-200 py-2 px-4 rounded-2xl"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="bg-gray-200 py-2 px-4 rounded-2xl"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <input
          required
          type="text"
          name="username"
          placeholder="Username"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          required
          name="password"
          type="Password"
          placeholder="Password"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          required
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-200 py-2 px-4 rounded-2xl"
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="submit"
          className="rounded-3xl bg-cyan-400 text-xl py-2 px-4"
        >
          Sign Up
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
        You have an account already -{" "}
        <span
          className="text-blue-600 cursor-pointer font-medium"
          onClick={() => {
            setComponent("login");
          }}
        >
          Login
        </span>
      </h1>
    </div>
  );
}
