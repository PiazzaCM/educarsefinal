import { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { UserContext } from '../context/UserContext';
import { userTypes } from '../context/userTypes';
import LoadingButton from './LoadingButton';

const ChangeColor = ({show, handleClose}) => {

    const { userState: { token, portadaColor }, userDispatch } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    
    const [color, setColor] = useState(portadaColor);
    

    const updateColor = async () => {
        setLoading(true);
        const req = await fetch('http://localhost:3000/user/updateColor', {
            method: 'PATCH',
            body: JSON.stringify({portadaColor: color}),
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })
        setLoading(false);

        if(req.ok){
            userDispatch({type: userTypes.UPDATE_COLOR, payload: color})
            handleClose();
        }
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Cambiar color de la portada</Modal.Header>
        <Modal.Body>
            <div>
                <div className='form-group mt-3'>
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor="color-picker">Seleccione un color</label>
                        <input type="color" className='form-control form-control-color' value={color} onChange={({target})=>setColor(target.value)} id='color-picker'/>                  
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={()=>updateColor()}>{loading ? <LoadingButton/> : 'Guardar'}</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ChangeColor