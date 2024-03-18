import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "../pages/ChatPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          {/* el asterisco le dice a react que las rutas son anidadas y el elemento debe responder a la ruta que comienza con /auth/ */}
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
