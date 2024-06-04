import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "test1@test.com",
    password: "123456",
    rememberMe: false,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCheck = () => {
    setForm({ ...form, rememberMe: !form.rememberMe });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.rememberMe) {
      localStorage.setItem("email", form.email);
    } else {
      localStorage.removeItem("email");
    }

    const { email, password } = form;
    const ok = await login(password, email);
    if (!ok) {
      Swal.fire({
        title: "Error",
        text: "El usuario o contraseña no coinciden",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const todoOk = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  useEffect(() => {
    const rememberMeEmail = localStorage.getItem("email");
    if (rememberMeEmail) {
      setForm((form) => ({
        ...form,
        email: rememberMeEmail,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={toggleCheck}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          disabled={!todoOk()}
          className="login100-form-btn"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
