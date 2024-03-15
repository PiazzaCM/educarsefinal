import React, { useContext, useState } from "react";
import "./css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { UserContext } from "../context/UserContext";
import { userTypes } from "../context/userTypes";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [text, setText] = useState("");


  const search = (e) =>{
    e.preventDefault()
    
    !text ? navigate('/explorar') : navigate('/explorar?search='+text);
  }

  const logOut = () => {
    userDispatch({
      type: userTypes.logout,
    });

    navigate("/login");
  };
  return (
    <>
      <nav className="navbar colornav navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid colornav otros">
          <img src="/img/icon.png" height="50px" alt="Logo" />
          <Link to={"/"} className="navbar-brand">
            <strong>educARse</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/explorar"
                >
                  Explorar
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Ayuda
                </a>
              </li>
              {
                userState.isLogged && userState.role === 1 ?
                  <li className="nav-item">
                    <PostForm />
                  </li> : null}
            </ul>
            <div className="container-fluid">
              <div className="row">
                <div className="col-4 mb-2 mb-lg-0">
                  <form className="d-flex" role="search" onSubmit={search}>
                    <input
                      className="form-control search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={text}
                      onChange={({target}) => setText(target.value)}
                    />
                  </form>
                </div>

                <div className="col-8 mb-3 mb-lg-0 text-end">
                  {userState.isLogged ? (
                    <div className="profile">
                      <div className="dropdown">
                        <h6
                          style={{ marginRight: "10px", fontSize: "18px" }}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-person-circle"></i>{" "}
                          {userState.name} {userState.surname}
                        </h6>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          { userState.role === 1 ?
                          <li>
                            <Link className="dropdown-item" to={'/miperfil'}>
                              Perfil
                            </Link>
                          </li> : null}
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                           { userState.role === 1 ?
                          <li>
                            <Link className="dropdown-item" to={'/mensajes'}>
                              Mensajes
                            </Link>
                          </li> : null}
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => logOut()}
                            >
                              Cerrar sesión
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="button-area">
                      <Link to="/login" className="btn  boton1 nav-item">
                        Iniciar sesión
                      </Link>{" "}
                      <Link to="/registro" className="btn  boton2 nav-item">
                        Regístrate
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
