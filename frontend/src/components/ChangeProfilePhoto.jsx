import { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import LoadingButton from './LoadingButton';


const ChangeProfilePhoto = ({show, handleClose}) => {

    const { userState, userDispatch } = useContext(UserContext);

    const [imagen, setImagen] = useState(null);
    const [imageURL, setImageURL] = useState(userState.imagen)
    const [loading, setLoading] = useState(false);

    const handleImage = ({ target }) => {
        const file = target.files[0];
        setImagen(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageURL(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setImageURL(userState.imagen);
        }
    }


    const updatePhoto = async()=>{
        setLoading(true);
        const formData = new FormData();
        formData.append('imagen', imagen);

        const res = await fetch('http://localhost:3000/user/updatePhoto', {
            method: 'PATCH',
            body: formData,
            headers: {
                token: userState.token
            }
        })
        setLoading(false);
        const payload = await res.json();

        if(res.ok){
            setLoading(false);

            userDispatch({
                type: 'UPDATE_PHOTO',
                payload
            })
            handleClose();
        }
    };

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Cambiar foto de perfil</Modal.Header>
        <Modal.Body>
            <div>
                <img src={imageURL} alt="profile" style={{height: 'auto', width: '100%'}}/>

                <div className='form-group mt-3'>
                    <label htmlFor="profile-img">Cambiar perfil</label>
                    <input type="file" className='form-control' id='profile-img' onChange={handleImage}/>                  
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={()=>updatePhoto()}>{loading ? <LoadingButton/> : 'Guardar'}</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ChangeProfilePhoto