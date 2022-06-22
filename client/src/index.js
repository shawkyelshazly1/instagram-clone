import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from "./utils/auth";
import jwtDecode from "jwt-decode";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const refreshLink = new TokenRefreshLink({
  // setting access token field name
  accessTokenField: "accessToken",

  // validating if token valid or not on frontend
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  },

  //fetch new access token
  fetchAccessToken: () => {
    return fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },

  // handle fetching the access token and saving it in localstorage
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },

  // handle Errors
  handleError: (err) => {
    console.error(err);
    client.resetStore();
  },
});

// setup basic http link for connection
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

// setup auth link
const authLink = setContext((_, { prevHeaders }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...prevHeaders,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// Init apollo client instance with custom link with error fallback for authentication
const client = new ApolloClient({
  link: from([refreshLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
