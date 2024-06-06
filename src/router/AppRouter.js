import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);
  console.log(auth);
  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth/*"
            element={<PublicRoute isAuthenticated={auth.logged} />}
          />
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={auth.logged} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
