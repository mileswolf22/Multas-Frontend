import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/Home.css'
import Modal from '../pages/Modal'
import botones_logo from '../../public/botones-links-pago.png'
import DOMPurify  from 'dompurify' ;

function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
     //State para almacenar el valor mandado por el usuario
     const [inputValue, setInputValue] = useState("");

//Funcionamiento de Modal

    useEffect(() => {
        // Muestra el modal automáticamente al cargar la página
        setModalOpen(true);
    }, []);

    useEffect(() => {
        if(isModalOpen) {
            document.body.style.overflow = "hidden"; //bloquear scroll
        }else{
            document.body.style.overflow = "auto"; //restaurar el scroll
        }

        return () => {
            document.body.style.overflow = "auto"; //Limpieza en caso de desmontar
        };
    }, [isModalOpen]);

       
// Sanitizacion de input en busqueda de placas

        const handleInputChange = (e) => {
            //Sanitizar la entrada antes de guardarla en el estado
            const sanitizedValue = DOMPurify.sanitize(e.target.value);
            setInputValue(sanitizedValue);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            //volver a sanitizar antes de mandar
            const safeData = DOMPurify.sanitize(inputValue);

            try{
                const response = await axios.get("http://localhost:5000/infracciones/", {
                    placa: safeData,
                });

                //variable que contiene el json resultante
                const data = response.data;
            }catch(error){
                console.error("Error en la consulta", error);
            }
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
                <p id="hero-parrafo">Si necesitas soporte, puedes comunicarte al siguiente correo electrónico: multas@monterrey.gob.mx</p>
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

                    <div className='consulta__formulario'>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form--placa">
                                <p>Placa: </p>
                                <input id="input" type="text" value={inputValue} onChange={handleInputChange}></input>
                                <button id="button" type ="submit">Buscar</button>
                            </div>

                            <div className="form--table">
                                <table className="table" border={1}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                            <th scope="col">Boleta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                            <td data-lable ="boleta" ></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='form-group'>
                                <table className="table-result">
                                    <tbody>
                                        <tr>
                                            <td className='tdtable'>Monto Total:</td>
                                        </tr>
                                        <tr>
                                            <td className='tdtable'>Descuentos:</td>
                                        </tr>
                                        <tr>
                                            <td className='tdtable'>Total a Pagar:</td>
                                        </tr>
                                        <tr>
                                            <td className='tdtable'></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div className='consulta__footer'>
                        <p>PARA REALIZAR SU PAGO ACUDA A SU DELEGACION MAS CERCANA</p>
                        <p>Para dudas...</p>
                        <p>Para actualiza la pagina</p>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            </div>



        </div>

    )
}

export default Home;