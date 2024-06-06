import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.rememberMe) {
      localStorage.setItem("email", form.email);
    } else {
      localStorage.removeItem("email");
    }

    const { name, email, password } = form;
    const msg = await register(name, email, password);
    if (msg !== true) {
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const todoOk = () => {
    return form.name.length > 0 &&
      form.email.length > 0 &&
      form.password.length > 0
      ? true
      : false;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

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
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          typeç="submit"
          disabled={!todoOk()}
          className="login100-form-btn"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
