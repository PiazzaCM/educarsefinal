import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Toast } from "./Toast";
import LoadingButton from "./LoadingButton";
import './css/post.css'
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { UserContext } from "../context/UserContext";

function PostForm() {


  const { userState: { token }, setPosts, socket } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImage = ({ target }) => {
    setForm({ ...form, imagen: target.files[0] });
  }

  const createPost = async () => {
    setLoading(true);
    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    const peticion = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: formData,
      headers: {
        token
      }
    });
    setLoading(false);

    const payload = await peticion.json();

    if (peticion.ok) {
      Toast.fire({
        icon: 'success',
        title: 'Posteado con exito'
      });
      setPosts(valorPrevio => [...valorPrevio, payload]);
      socket.emit('posts', payload);
      return handleClose();
    }

  };
  return (
    <>
      <a className="nav-link" onClick={handleShow}>
        {" "}
        Publicar{" "}
      </a>

      <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={form.title}
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
                value={form.descripcion}
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
                    value={form.disponibilidad}
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
                    value={form.precio}
                    onChange={handleChange}
                    name="precio"
                  />
                </Form.Group>
                <Form.Group controlId="tipoPrecio" className="col-6">
                  <Form.Label>Precio por:</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder=""
                    value={form.typepriceId}
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
                  type="radio"
                  label="Profesor"
                  id="profesor"
                  value="2"
                  onChange={handleChange}
                  name="typepostId"
                />
                <Form.Check
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

                          setForm(prevForm => { return { ...prevForm, lat: center.lat, lon: center.lng, radius: radius } });
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
                  </FeatureGroup>

                </MapContainer>
              </div>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="button" className="customBtn" variant="primary" onClick={() => createPost()}>
            {loading ? <LoadingButton /> : "Publicar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostForm;
