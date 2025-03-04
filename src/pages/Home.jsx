/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../styles/Home.css'
import Modal from '../pages/Modal'
import Placas from '../pages/Placas'
import botones_logo from '../../public/botones-links-pago.png'
import botones_logo_svg from '../../public/botones-links-pago.svg'
import botones_logo_webp from '../../public/botones-links-pago.webp'
import botones_logo_jpg from '../../public/botones-links-pago.jpg'
import {useModal} from '../hooks/useModal'

function Home() {
    const { isModalOpen, setModalOpen } = useModal(); // Usa el hook
    const redirigir = () => {
        window.location.href = 'https://www.monterrey.gob.mx/pdf/portaln/AvisosPrivacidad/AVISO%20INTEGRAL%20TESORERIA%20MUNICIPAL.pdf'
      };

      
    return(

        <div className= "body">
             <script src="https://www.google.com/recaptcha/api.js"></script>
             <script type="text/javascript" src="src/purify.js"></script>
             {/*Meta que activa las cabeceras de seguridad  para evitar XSS*/}
             {/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://apis.example.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' data:"></meta> */}
           
            <script>

            </script>

            <div className='header'>
                <div className='header__logo'>
                  
                </div>
                <div className='header__nav'>
                    <div className="header__nav--up">
                        <Link id="Link">Buscar</Link>
                        <Link id="Link">Menu</Link>
                        <Link id="Link">Login/Registrarse</Link>
                    </div>
                    <div className='header__nav--down'>
                        <Link id="Link">Op1</Link>
                        <Link id="Link">op2</Link>
                        <Link id="Link">op3</Link>
                        <Link id="Link">op4</Link>
                    </div>
                </div>  
            </div>



            <div className='hero'>
                <div className="hero-parrafo">
                    <p>Si necesitas soporte, puedes comunicarte al siguiente correo electrónico: multas@monterrey.gob.mx</p>
                </div>
                
                <div className="hero__image">
                    <img id="botones" src= {botones_logo} alt="botones" />
                
                    {/* <picture>
                        <source sizes="1920w" srcSet={botones_logo_webp} type="image/svg" />
                        <source sizes="1920w" srcSet={botones_logo_webp} type="image/webp" />
                        <source sizes="1920w" srcSet={botones_logo_png} type="image/png" />
                        <img 
                            loading="lazy" 
                            decoding="async" 
                            src={botones_logo_jpg}
                            alt="imagen" 
                            width="1000" 
                            height="600" 
                        />
                    </picture> */}

                </div>
                <div className="botones-parrafo">
                <p >Paga tus multas de forma rapida</p>
                </div>
                
            </div>


            <div className= "main">
                <div className='consulta'>
                    <div className="consulta__titulo">
                        <h2>Consulta y Pago de Infracciones</h2>
                        <p>Para consultar tus multas de tránsito, teclea tu placa sin guiones ni espacios</p>
                    </div>

                    <Placas/>

                    <div className='consulta__footer'>
                        <p>PARA REALIZAR SU PAGO ACUDA A SU DELEGACIÓN MÁS CERCANA, TELÉFONO: 81 8305 0978</p>
                        <p>Para dudas sobre su adeudo llámenos al 81 8305 0900, Ext. 1978</p>
                        
                        <Link id="aviso__footer" onClick={redirigir}>Aviso de privacidad</Link>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            </div>



        </div>

    )
}

export default Home;