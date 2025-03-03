/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../styles/Home.css'
import Modal from '../pages/Modal'
import Placas from '../pages/Placas'
import botones_logo from '../../public/botones-links-pago.png'
import {useModal} from '../hooks/useModal'

function Home() {
    const { isModalOpen, setModalOpen } = useModal(); // Usa el hook

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
                </div>
                <div className="botones-parrafo">
                <p >Paga tus multas de forma rapida</p>
                </div>
                
            </div>


            <div className= "main">
                <div className='consulta'>
                    <div className="consulta__titulo">
                        <h2>Consulta y Pago de Infracciones</h2>
                        <p>Para consultar tus multas de transito, teclea tu placa</p>
                    </div>

                    <Placas/>

                    <div className='consulta__footer'>
                        <p>PARA REALIZAR SU PAGO ACUDA A SU DELEGACION MAS CERCANA</p>
                        <p>Para dudas sobre su adeudo llámenos al ...</p>
                        
                        <Link id="aviso__footer">Aviso de privacidad</Link>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            </div>



        </div>

    )
}

export default Home;