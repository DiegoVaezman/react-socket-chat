import React, { createContext, useCallback, useState } from "react";
import { fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (password, email) => {
    const res = await fetchSinToken("login", "POST", { email, password });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { email, name, online, uid } = res.user;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });
      console.log("Autenticado");
    }
    return res.ok;
  };

  const register = async (name, email, password) => {
    const res = await fetchSinToken("register", "POST", {
      name,
      email,
      password,
    });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { email, name, online, uid } = res.user;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });
      console.log("Autenticado");
    }
    return res.ok;
  };

  const verificaToken = useCallback(() => {}, []);

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        verificaToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
