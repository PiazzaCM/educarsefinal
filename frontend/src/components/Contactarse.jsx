import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "../components/css/contactarse.css";
import { Toast } from "./Toast";
import { UserContext } from "../context/UserContext";
import LoadingButton from "./LoadingButton";

function Contactarse({nameOwner, surnameOwner, toEmail, titulo}) {

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    asunto: "",
    mensaje: "",
  })

  const { userState: {name, surname, email} } = useContext(UserContext);

  const enviarMensaje = async ()=> {
    setLoading(true);
    const req = await fetch('http://localhost:3000/contacto', {
      method: 'POST',
      body: JSON.stringify({
        name, surname, email, toEmail, nameOwner, surnameOwner, titulo, ...data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setLoading(false);
    if(req.ok){
      Toast.fire({
        icon: 'success',
        title: 'Mensaje enviado con éxito'
      })

      handleClose();
    }
  }

  return (
    <>
      <Button variant="primary custom-btn" onClick={handleShow}>
        Contactarse
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contactarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="text" placeholder="Asunto" onChange={({target})=>setData({...data, asunto: target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={({target})=>setData({...data, mensaje: target.value})}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary custom-btn" onClick={()=>enviarMensaje()}>
            {loading ? <LoadingButton/> : 'Enviar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Contactarse;
