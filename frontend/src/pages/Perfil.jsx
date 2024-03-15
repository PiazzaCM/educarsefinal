import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/css/perfil.css";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import ChangeProfilePhoto from "../components/ChangeProfilePhoto";
import ChangeColor from "../components/ChangeColor";
import moment from 'moment';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Circle, FeatureGroup, MapContainer, Popup, TileLayer } from "react-leaflet";
import Swal from 'sweetalert2'
import StarRatings from 'react-star-ratings'
import { EditControl } from "react-leaflet-draw";
import LoadingButton from "../components/LoadingButton";

const Perfil = () => {

  const { userState: { name, surname, username, email, valoracion, imagen, portadaColor, id, token }, posts, setPosts } = useContext(UserContext);

  const [verMas, setVerMas] = useState({
    title: "",
    descripcion: "",
    disponibilidad: "",
    imagen: "",
    precio: "",
    typepriceId: "",
    typepostId: "",
    lat: 0,
    lon: 0,
    radius: 0,
  });
  const [show, setShow] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    setVerMas({
      ...verMas,
      [name]: value,
    });
  };

  const handleImage = ({ target }) => {
    setVerMas({ ...verMas, imagen: target.files[0] });
  }

  const getInfoPost = (id) => {
    const info = posts.find(post => post.id === id)
    setVerMas(info)
    setShowModal(true)
}


  const deletePostAlert = (id) => {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar el post?",
      text: "No podras revertirlo",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ff8400",
      confirmButtonText: "Eliminar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const response = await fetch(`http://localhost:3000/post/${id}`, {method: 'DELETE'});
          if (!response.ok) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(await response.json())}
            `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        setPosts(posts.filter(post => post.id !== id));
        setShowModal(false);
        Swal.fire({
          title: `Se elimino el post con exito`,
          icon: 'success'
        });
      }
    });
  }

  const generarLinkValoracion = async()=>{
    const req = await fetch('http://localhost:3000/codigo', {
      method: 'POST',
      body: JSON.stringify({
        name, surname, idUser: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const codigo = await req.json();
    if(req.ok){
      Swal.fire({
        title: `Tu link de valoración es:`,
        text: 'http://localhost:5173/valoracion/'+codigo,
        icon: 'success'
      });
    }
  }

  const updatePost = async ()=>{
    setLoading(true); 
    const formData = new FormData();

    for (const key in verMas) {
        formData.append(key, verMas[key]);
    }
    
    const req = await fetch('http://localhost:3000/post/'+verMas.id, {
      method: 'PUT',
      body: formData,
      headers: {
        token
      }
    })

    setLoading(false);
    const post = await req.json();

    if(req.ok){
      setPosts(posts.map(p => p.id === post.id ? post : p));
      setShowEditar(false);
    }
  };

  return (
    <>
      <Navbar />
      <ChangeProfilePhoto show={show} handleClose={() => setShow(!show)} />
      <ChangeColor show={showColor} handleClose={() => setShowColor(!showColor)} />


      <Modal show={showModal} onHide={()=>setShowModal(!showModal)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>{verMas.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example">

          <Container>
            <Row>
              <Col xs={12} md={8}>
                <div>
                  <img src={verMas.imagen} id="imagenModal" alt="..." height="500px" /></div>
                <div className="mt-4 borde-desc">
                  <div className="col">
                    <h5> <strong>DESCRIPCIÓN</strong></h5>
                    <p>{verMas.descripcion}</p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <MapContainer center={[verMas.lat, verMas.lon]} zoom={14} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle center={[verMas.lat, verMas.lon]} radius={verMas.radius}>
                    <Popup>
                      {`Área del ${verMas.typepost?.name}`}
                    </Popup>
                  </Circle>
                </MapContainer>

                <div className="borde mt-4">

                  <div className="col">
                    <h5> <strong>PROFESIONAL</strong></h5>
                    <p>{verMas.user?.name} {verMas.user?.surname}</p>
                  </div>

                </div>

                <div className="borde mt-4">
                  <div className="col">
                    <h5> <strong>DISPONIBILIDAD</strong></h5>
                    <p>{verMas.disponibilidad}</p>
                  </div>
                </div>

                <div className="borde mt-4">
                  <div className="col">
                    <h5> <strong>PRECIO</strong></h5>
                    <p>${verMas.precio} / {verMas.typeprice?.name}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>deletePostAlert(verMas.id)}>Eliminar</Button>
          <Button variant="warning" onClick={()=>[setShowEditar(true), setShowModal(false)]}>Editar</Button>
        </Modal.Footer>
      </Modal>

      <Modal dialogClassName="modal-xl" show={showEditar} centered={true} onHide={()=>setShowEditar(!showEditar)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={verMas.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción"
                value={verMas.descripcion}
                onChange={handleChange}
                name="descripcion"
              />
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="disponibilidad">
                  <Form.Label>Disponibilidad:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la disponibilidad"
                    value={verMas.disponibilidad}
                    onChange={handleChange}
                    name="disponibilidad"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="imagen">
                  <Form.Label>Imagen:</Form.Label>
                  <Form.Control
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImage}
                  />

                </Form.Group>
                <div className="row">
                  <Form.Group className="mb-3 col-6" controlId="precio">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                      className="col-2"
                      type="number"
                      placeholder="Ingrese el precio"
                      value={verMas.precio}
                      onChange={handleChange}
                      name="precio"
                    />
                  </Form.Group>
                  <Form.Group controlId="tipoPrecio" className="col-6">
                    <Form.Label>Precio por:</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder=""
                      value={verMas.typepriceId}
                      onChange={handleChange}
                      name="typepriceId"
                    >
                      <option value="1">Hora</option>
                      <option value="2">Dia</option>
                      <option value="3">Semana</option>
                      <option value="4">Mes</option>
                      <option value="5">Curso</option>
                    </Form.Control>
                  </Form.Group>
                </div>

                <Form.Check
                  checked={verMas.typepostId == 2}
                  type="radio"
                  label="Profesor"
                  id="profesor"
                  value="2"
                  onChange={handleChange}
                  name="typepostId"
                />
                <Form.Check
                  checked={verMas.typepostId == 1}
                  type="radio"
                  label="Curso"
                  id="curso"
                  value="1"
                  onChange={handleChange}
                  name="typepostId"
                />
              </div>
              <div className="col-6 map-create">
                <MapContainer center={[-26.1858, -58.1754]} zoom={13} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FeatureGroup>
                    <EditControl
                      onCreated={(e) => {
                        const { layerType, layer } = e;
                        if (layerType === "circle") {
                          const circle = layer;
                          const center = circle.getLatLng(); // Obtiene las coordenadas del centro del círculo
                          const radius = circle.getRadius(); // Obtiene el radio del círculo

                          setVerMas(prevForm => { return { ...prevForm, lat: center.lat, lon: center.lng, radius: radius } });
                        }
                      }}

                      position="topleft"
                      draw={{
                        marker: false,
                        circle: true,
                        circlemarker: false,
                        polyline: false,
                        rectangle: false,
                        polygon: false
                      }}
                    />
                    <Circle center={[verMas.lat, verMas.lon]} radius={verMas.radius}/>
                  </FeatureGroup>

                </MapContainer>
              </div>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={()=>setShowEditar(!showEditar)}>
            Cerrar
          </Button>
          <Button type="button" className="customBtn" variant="primary" onClick={() => updatePost()}>
            {loading ? <LoadingButton /> : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="container-fluid">
        <div className="portada" style={{ backgroundColor: portadaColor }}>
          <i className="bi bi-pencil-square" onClick={() => setShowColor(true)} style={{ color: "white", fontSize: '1.4em', position: 'absolute', right: '10px', top: '5px', cursor: 'pointer' }}></i>
          <div className="name-container">
            <h2 className="text-light">{username}</h2>
          </div>
          <div className="fotoPerfil">
            <img src={imagen} />
            <div className="capa" onClick={() => setShow(true)}>
              <i className="bi bi-pencil-square" style={{ color: "white", fontSize: '2em' }}></i>
              <p>Editar perfil</p>
            </div>
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
                    {posts.filter(post => post.userId === id).map((post) => (
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
                          <li className={`page-item ${!posts.filter(post => post.userId === id).slice(page + 3, page + 6).length && 'disabled'}`} style={{cursor: 'pointer'}}>
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
                <p>{name} {surname}</p>
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Correo</strong>
                </h5>
                <p>{email}</p>
              </div>
              <div className="col text-center datos">
                <div className="d-flex justify-content-center align-items-center">
                  <h5><strong>Valoracion</strong></h5> <i onClick={()=>generarLinkValoracion()} style={{cursor: 'pointer', fontSize: '20px', marginLeft: '5px'}} className="bi bi-link-45deg"></i>
                </div>
                <StarRatings
                  rating={valoracion}
                  starDimension="40px"
                  starSpacing="1px"
                  starRatedColor="#FFC107"
                />
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Vistas al perfil</strong>
                </h5>
                <p>240</p>
              </div>
              <div className="col text-center datos">
                <h5>
                  <strong>Se unio el:</strong>
                </h5>
                <p>{new Date().toLocaleDateString('es')}</p>
              </div>
              
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Perfil;
