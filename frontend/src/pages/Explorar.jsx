import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap'
import '../components/css/explorar.css';
import { UserContext } from "../context/UserContext";
import moment from 'moment';
import 'moment/dist/locale/es';
import { MapContainer, TileLayer, Popup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MagicMotion } from 'react-magic-motion';
import { useLocation, useNavigate } from "react-router-dom";
import Contactarse from "../components/Contactarse";



const Explorar = () => {

    const { userState, posts} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const navigate = useNavigate();

    const params = new URLSearchParams(useLocation().search);
    const search = params.get('search');

    const [verMas, setVerMas] = useState({})
    const [tipo, setTipo] = useState(0);

    const getInfoPost = (id) => {
        const info = posts.find(post => post.id === id)
        setVerMas(info)
        setShow(true)
    }


    const filter = search && tipo ? posts.filter(post => post.title.toLowerCase().includes(search) && post.typepostId == tipo) : search ? posts.filter(post => post.title.toLowerCase().includes(search)) : tipo ? posts.filter(post => post.typepostId == tipo) : posts


    return (
        <>
            <Navbar />
            <div className="container">
                <div>
                    <div className="container d-flex justify-content-center align-items-center  mt-4">
                        <h2 className="header text-center mt-4 col-12">Publicaciones</h2>
                    </div>
                    <Form.Group className="mb-4 col-4">
                        <Form.Label>Filtrar por tipo:</Form.Label>
                        <select className="form-control" onChange={({ target }) => setTipo(parseInt(target.value))}>
                            <option value={0}>Todos</option>
                            <option value={1}>Curso</option>
                            <option value={2}>Profesor</option>
                        </select>
                    </Form.Group>
                </div>

                <Modal show={show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{verMas.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="grid-example">
                        {userState.isLogged ?
                            <>
                                 <Container>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <div>
                                                <img src={verMas.imagen} id="imagenModal" alt="..." height="500px"/></div>
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

                                                <div className="col" style={{cursor: 'pointer'}} onClick={()=>navigate(`/${verMas.user.username}`)}>
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
                            </> : <div>
                                <h1>Debes iniciar sesion para ver más información</h1>
                            </div>}

                    </Modal.Body>
                    <Modal.Footer>
                        {userState.isLogged ?
                            <>
                                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                                 <div><Contactarse nameOwner={verMas.user?.name} surnameOwner={verMas.user?.surname} toEmail={verMas.user?.email} titulo={verMas.title}/> </div>
                            </> :
                            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        }
                    </Modal.Footer>
                </Modal>

                <div className="row row-cols-1 row-cols-md-3 g-4 contenido">
                    <MagicMotion>
                        {filter.map((post) => (
                            <div className="col" key={post.id} onClick={() => getInfoPost(post.id)}>
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
                        )).reverse()}
                    </MagicMotion>
                </div>

            </div>


            <Footer />
        </>
    )
}

export default Explorar
