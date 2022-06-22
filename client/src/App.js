import { useEffect, useState } from "react";
import RoutesProvider from "./RoutesProvider";
import { setAccessToken } from "./utils/auth";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return <RoutesProvider />;
}

export default App;
