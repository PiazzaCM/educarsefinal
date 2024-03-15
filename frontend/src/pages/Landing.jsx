import React, { useContext, useEffect } from 'react'
import '../components/css/landing.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/carousel'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Landing = () => {

  const { userState } = useContext(UserContext)


  useEffect(() => {
    let swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },
    });
  }, [])
  return (
    <>
      <Navbar />
      <div className="fondo d-flex justify-content-center align-items-center">
        <div className="covertext text-center">
          <div className="col-lg-12">
            <h1 className="title">educARse</h1>
            <h3 className="subtitle">Somos una plataforma destinada a los estudiantes y profesionales de la educación.</h3>
          </div>
          <div className="col-xs-12 explore">
            {
              userState.isLogged ?
                <Link to={'/explorar'} type="button" className="btn btn-lg unete">Explorar</Link>
                :
                <Link to={'/registro'} type="button" className="btn btn-lg unete">ÚNETE</Link>
            }
          </div>
        </div>
      </div>
      <div className='contMain col-12'>
        <div className='banda'>

          <div className='container'>
            <div className="cinta text-center">
              <div className="rounded text-center col-12 col-md-12 p-3 mb-1">
                <h4 className="font-weight-bold text-white">CURSOS RECOMENDADOS</h4>
              </div>
              {/* Agrega aquí el contenido adicional si es necesario */}
            </div>
            <div className="swiper mySwiper pt-3">
              <div className="swiper-wrapper">


                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
               



              </div>
              <div className="swiper-pagination "></div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className='banda'>
            <div className="cinta">
              <div className="rounded text-center col-12 col-md-12 p-3 mb-1">
                <h4 className="font-weight-bold text-white">PROFESORES RECOMENDADOS</h4>
              </div>
              {/* Agrega aquí el contenido adicional si es necesario */}
            </div>
            <div className="swiper mySwiper pt-3">
              <div className="swiper-wrapper">


                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>
                <div className="card swiper-slide">
                  <img src="https://img.freepik.com/vector-premium/concepto-imaginacion-e-inspiracion-educacion-artistica-leccion-dibujo-proceso-creativo_361213-915.jpg?w=2000" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como
                      introducción
                      natural a contenido adicional.</p>
                  </div>
                </div>




              </div>
              <div className="swiper-pagination "></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Landing