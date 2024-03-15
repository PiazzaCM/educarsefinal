import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/css/perfil.css";
import { useState } from "react";
import moment from 'moment';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings'


const UserProfile = () => {

  const [page, setPage] = useState(0);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  const { username } = useParams();

  const getUserInfo = async () =>  {
    const res = await fetch(`http://localhost:3000/user/${username}`)
    const data = await res.json()
    setPosts(data.post);

    setProfile(data.user);
  }
  
  useEffect(()=>{
    getUserInfo()
  },[])



  return (
    <>
      <Navbar/>
      <div className="container-fluid">
        <div className="portada" style={{ backgroundColor: profile.portadaColor }}>
          <div className="name-container">
            <h2 className="text-light">{profile.username}</h2>
          </div>
          <div className="fotoPerfil">
            <img src={profile.imagen}/>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex align-items-center ">
            <div className="misPost col-8 m-1">
              <div className="posts">
                <div className="d-flex justify-content-center align-items-center">
                  <h2 className="header text-center mt-4 col-8">
                    Mis Publicaciones
                  </h2>
                </div>
                <div className="container mt-4">
                  <div className="row g-4">
                    {!posts.length &&
                    <div className="d-flex justify-content-center align-items-center" style={{height: '40vh'}}>
                      <h2 className="text-dark text-center">El usuario no tiene ninguna publicacion disponible</h2>  
                    </div>}
                    {posts.map((post) => (
                      <div className="col-4" key={post.id} onClick={() => getInfoPost(post.id)}>
                        <div className="card">
                          <img src={post.imagen} className="card-img-top" alt="..." height="250px" />
                          <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.descripcion}</p>
                            <p className="card-text">{post.typepost.name}</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-body-secondary">{moment(post.createdAt).fromNow()}</small>
                          </div>
                        </div>
                      </div>
                    )).reverse().slice(page, page + 3)}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Form.Group className="mb-3" controlId="estado">
                      <div>
                        <ul className="pagination">
                          <li className={`page-item ${page === 0 && 'disabled'}`} style={{cursor: 'pointer'}}>
                            <a className="page-link" onClick={() => setPage(page - 3)}>Anterior</a>
                          </li>
                          <li className={`page-item ${!posts.slice(page + 3, page + 6).length && 'disabled'}`} style={{cursor: 'pointer'}}>
                            <a className="page-link" onClick={() => setPage(page + 3)}>Siguiente</a>
                          </li>
                        </ul>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
            <div className="misDatos col-3">
              <div className="col text-center datos">
                <h5>
                  <strong>SOY</strong>
                </h5>
                <p>{profile.name} {profile.surname}</p>
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Correo</strong>
                </h5>
                <p>{profile.email}</p>
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Valoracion</strong>
                </h5>
                <StarRatings
                  rating={profile.valoracion}
                  starDimension="40px"
                  starSpacing="1px"
                  starRatedColor="#FFC107"
                />
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Vistas al perfil</strong>
                </h5>
                <p>{profile.visitas}</p>
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Se unio el:</strong>
                </h5>
                <p>{new Date(profile.createdAt).toLocaleDateString('es')}</p>
              </div>
              
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
