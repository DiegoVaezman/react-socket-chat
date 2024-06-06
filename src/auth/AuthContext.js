import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/Types";

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

  const { dispatch } = useContext(ChatContext);

  const login = async (password, email) => {
    const res = await fetchSinToken("login", "POST", { email, password });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { email, name, uid } = res.user;
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
    const res = await fetchSinToken("login/new", "POST", {
      name,
      email,
      password,
    });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { email, name, uid } = res.user;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });
      console.log("Autenticado");
      return true;
    }
    return res.msg;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    const res = await fetchConToken("login/renew");
    if (res.ok) {
      const { email, name, uid } = res.user;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });
      console.log("Autenticado");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: types.cerrarSesion,
    });

    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
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
