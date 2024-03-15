import React, { useContext } from "react";
import "../components/css/login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { userTypes } from "../context/userTypes";
import { Toast } from "../components/Toast";
import { validarLogin } from "../helper/validarLogin";
import LoadingButton from "../components/LoadingButton";

const Login = () => {

  const { userDispatch } = useContext(UserContext)

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

      setForm({
        ...form,
        [name]: value
      });
  }

  const loginUser = async () => {
    if(!validarLogin(form)){
      return
    }

    setLoading(true);
    const peticion = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });
    setLoading(false);

    const payload = await peticion.json();

    if(peticion.ok){
      userDispatch({
        type: userTypes.login,
        payload
      });

      return Toast.fire({
        icon: 'success',
        title: 'Ingreso exitoso'
      });
    }else {
      return Toast.fire({
        icon: 'error',
        title: payload.error,
        width: '500px'
      });
    }

  }


  return (
    <>
      <Navbar />
      <div className=" container d-flex justify-content-center align-items-center col-12  mt-4">
        <h2 className="header text-center mt-4 col-6">Ingresar</h2>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-6 row ">
          <form className="registro-container">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="email">Correo electronico:</label>
                <input
                  type="email"
                  id="correo"
                  className="form-control"
                  placeholder="Ingrese su correo"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="contraseña"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary custom-btn mt-3"
              onClick={()=>loginUser()}
            >
              {loading ? <LoadingButton/> : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
