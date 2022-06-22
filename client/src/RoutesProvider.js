import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PrivateRouter from "./pages/PrivateRouter";

export default function RoutesProvider() {
  return (
    <Router>
      <div className="container flex min-w-full min-h-screen">
        <Routes>
          <Route
            path="*"
            element={
              <>
                <PrivateRouter>
                  <Routes>
                    <Route path="/" element={<Main />} />
                  </Routes>
                </PrivateRouter>
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}
