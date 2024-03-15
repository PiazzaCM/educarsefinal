import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../components/css/valoracion.css'
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext';

const Valoracion = () => {

    const { codigo } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [profesor, setProfesor] = useState({});

    const { userState: { id } } = useContext(UserContext);

    const validarCodigo = async () => {  
        const req = await fetch(`http://localhost:3000/codigo/${codigo}`)
        const data = await req.json()
        
        if(!req.ok){
            return navigate('/notfound', {replace: true})
        }
        setProfesor(data)

        if(profesor.idUser === id){
            return navigate('/miperfil', {replace: true})
        }
    }


    const valorar = async ()=>{
        const req = await fetch(`http://localhost:3000/user/valorar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({valoracion: rating, id: profesor.idUser, codigo})
        })

        if(!req.ok){
            return alert('error al valorar')
        }
        
        Swal.fire({
            icon: 'success',
            title: 'Gracias por valorar',
        })

        return navigate('/', {replace: true});
    }

    useEffect(()=>{
        validarCodigo()
    }, [])

    return (
        <section id='valoracion'>
            <div className="container">
                <h2>Valorar a un profesor</h2>
                <div className='d-flex flex-column justify-content-center align-items-center text-center' style={{height: '20vh'}}>
                    <h5 >Valorar a {profesor.name} {profesor.surname} de 1 a 5 estrellas</h5>
                    
                    <StarRatings
                        rating={rating}
                        starDimension="40px"
                        starSpacing="1px"
                        starHoverColor="#FFC107"
                        changeRating={(newRating) => setRating(newRating)}
                        starRatedColor="#FFC107"
                    />

                    <button onClick={()=>valorar()} className='btn btn-primary mt-3' style={{backgroundColor: '#ff4000', border: 0}}>Enviar</button>
                </div>
                
                <footer className="footer">Gracias por elegir educARse</footer>
            </div>
        </section>
    )
}

export default Valoracion