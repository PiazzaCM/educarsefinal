import React, { useState } from "react";
import '../components/css/registro.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { validarForm } from "../helper/validarForm";
import LoadingButton from "../components/LoadingButton";

const Registro = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name:'',
    surname: '',
    username: '',
    email: "",
    password: "",
    confirmPassword: '',
    typeUserId: 0,
    imagen: null
  });

  

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

      setForm({
        ...form,
        [name]: value
      });
  }

  const handleImage = ({target}) => {
    setForm({...form, imagen: target.files[0]});
}

  const registrarse = async (e) =>{
    
    e.preventDefault();

    setLoading(true);
    if(!validarForm(form)){
      return
    }

    const formData = new FormData();

    for (const key in form) {
        formData.append(key, form[key]);
    }
    
    const peticion = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: formData
    })

    setLoading(false);

    const response = await peticion.json();

    if(peticion.ok){
      Toast.fire({
        icon: 'success',
        title: response.mensaje
      });
      return navigate('/login')
    }

    return Toast.fire({
      icon: 'error',
      title: response.message,
      width: '500px'
    });
  }

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center  mt-4">
        <h2 className="header text-center mt-4 col-6">Registrate</h2>
      </div>
      <div className="container d-flex justify-content-center align-items-center mb-4">
        <div className="col-md-6 row">
          <form className="registro-container" onSubmit={registrarse}>
            <div className="form-row mb-3 mt-3 ">
              <div className="form-group col-md-6 d-flex  mb-2 mt-2">
                <input type="text" className="form-control col-3" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" id="nombre" />
                <input type="text" className="form-control col-3" name="surname" value={form.surname} onChange={handleChange} placeholder="Apellido" id="apellido" />
              </div>
           
              <div className="form-group col-md-6 d-flex mb-2 mt-2">
                <input type="text" className="form-control col-3" name="username" value={form.username} onChange={handleChange} placeholder="Ingrese un nombre de usuario" id="username" />
                <input type="email" className="form-control col-3" name="email" value={form.email} onChange={handleChange} placeholder="Correo Electrónico" id="email" />
              </div>
              
              <div className="form-group col-md-6 d-flex mb-2 mt-2">
                <input type="password" className="form-control col-3" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" id="contraseña" />
                <input type="password" className="form-control col-3" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirmar Contraseña" id="recontraseña" />
              </div>
              <div className="form-group col-md-12 mb-2 mt-2">
                <label htmlFor="profile-img">Foto de perfil</label>
                <input type="file" className="form-control" name="imagen" onChange={handleImage} placeholder="Seleccione una foto" id="profile-img" />
              </div>
            </div>
            <div className="form-group mb-2 mt-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="radio" className="form-check-input"  onChange={handleChange} name="typeUserId" id="profesional" value="1" />
                    <label className="form-check-label" htmlFor="profesional">Profesional</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="radio" className="form-check-input"  onChange={handleChange} name="typeUserId" id="estudiante" value="2" />
                    <label className="form-check-label" htmlFor="estudiante">Estudiante</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group form-check mb-2 mt-2">
              <input type="checkbox" className="form-check-input" id="policyCheck" />
              <label className="form-check-label" htmlFor="policyCheck"> Acepto los términos y condiciones</label>
            </div>
            <button type="submit" className="btn btn-primary custom-btn mt-4">{loading ? <LoadingButton/> : 'Registrarse'}</button>
          </form>
        </div>
      </div>
      <div className="justify-content-center">
      <Footer />
      </div>
    </>
  )
}

export default Registro