/* eslint-disable no-unused-vars */
import React, { useState} from 'react';
import '../styles/Placas.css'
import axios from 'axios'
import DOMPurify  from 'dompurify';
import Datatable from 'react-data-table-component'

function Placas() {
  
    //State para almacenar el valor mandado por el usuario
        const [inputValue, setInputValue] = useState("");
    // Sanitizacion de input en busqueda de placas

    function DataTable(){

    }

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
          console.log("ENTRANDO")
          const response = await axios.get(`http://localhost:5000/infracciones/?placa=${safeData}`);
          console.log("ENTRANDO 2")
          //variable que contiene el json resultante
          //tengo que convertir los datos a un dataTable para su visualizacion
          const data = response.data;
          
          
      }catch(error){
          console.error("Error en la consulta", error);
      }
    };


return (
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
  );

}

export default Placas;
