import '../styles/Placas.css'
import { useState } from "react";
import axios from "axios";
import LoadingModal from '../pages/ModalLoad'
import DOMPurify from "dompurify";

import { AnimatePresence} from 'framer-motion';
import { procesarAdeudos } from '../hooks/placasDebt';


function Placas() {
  const [inputValue, setInputValue] = useState("");
  const [infracciones, setInfracciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisible(true);

    const safeData = DOMPurify.sanitize(inputValue);
    const input = document.getElementById("input");
    try {
      if(input.value.trim() === ""){
        input.classList.add("error")
        // alert("⚠️ Favor de ingresar datos validos: La placa debe contener un valor de 7 digitos ⚠️")
        setLoading(false);
        setVisible(false);
      }else{
        console.log("Realizando consulta...");
        //const response = await axios.get(`http://192.168.100.92:5000/api/infracciones/?placa=${safeData}`);
        //const response = await axios.get(`http://192.168.37.110:5000/api/infracciones/?placa=${safeData}`);
        //const response = await axios.get(`http://192.168.252.1:5000/api/infracciones/?placa=${safeData}`);
        const response = await axios.get(`http://pruebasdemultasdetransito.monterrey.gob.mx:5000/api/infracciones/?placa=${safeData.toUpperCase()}`);
        console.log(JSON.stringify(response.data, null, 2));
        setInfracciones(response.data); 

        //Descomentar para pruebas reales
        // if(response.data > 0){
        //   alert("No hay datos")
        //   setVisible(false);
        // }else{
        //   setVisible(true);
        // }
      }
    } catch (error) {
      setLoading(false);
      //alert("No se encontro informacion")
      console.error("Error en la consulta:", error);
    }
    };


  const clearTable = () => {
    setInfracciones([])
  }

  

  // Calculo de los totales iterando sobre cada infracción individualmente
  const montoTotal = infracciones.reduce((acumulador, infraccion) => {
    const { importe } = procesarAdeudos(infraccion);
    return acumulador + importe;
  }, 0);

  const descuentoTotal = infracciones.reduce((acumulador, infraccion) => {
    const { descuento } = procesarAdeudos(infraccion);
    return acumulador + descuento;
  }, 0);

  const totalPagar = montoTotal - descuentoTotal;

  const formatoDecimal = (numero) => new Intl.NumberFormat('en-US', { 
    style: 'decimal', 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
    }).format(numero);


  return (
    <div className="consulta__formulario">

      <AnimatePresence>
        {loading && <LoadingModal onClose={() => setLoading(false)} />}
      </AnimatePresence>
      
      <form className="form" onSubmit={handleSubmit}>
      
          <div className="form--placa">
            <p>Placa: </p>
            <input required id="input" type="text" value={inputValue} onChange={handleInputChange} placeholder='Ingrese su placa'/>
            <button id="button" type="submit" onClick={clearTable}>Buscar</button>
          </div>
          {visible &&(
          <div className="form--table">
            <table className="table" border={1}>
              <thead>
                <tr>
                  <th scope="col" className="table-header thReduce">Boleta</th>
                  <th scope="col" className="table-header thMidReduce">Placa</th>
                  <th scope="col" className="table-header">Fecha Infracción</th>
                  <th scope="col" id="LeftAlign" className="table-header thInfraccion">Infracción</th>
                  <th scope="col" id="LeftAlign" className="table-header">Descripción</th>
                  <th scope="col" className="table-header thReduce">Descuento</th>
                  <th scope="col" className="table-header thReduce">Monto</th>
                </tr>
              </thead>
              <tbody>
                {infracciones.length > 0 ? (
                  infracciones.map((infraccion, index) => {
                    const { importe, descuento, fechaCapitalizada } = procesarAdeudos(infraccion);
                

                    return (
                      <tr key={index}>
                        <td>{infraccion[0]}</td>
                        <td>{infraccion[1]}</td>
                        <td>{fechaCapitalizada}</td>
                        <td id="LeftAlign">{infraccion[3]}</td>
                        <td id="LeftAlign">{infraccion[4]}</td>
                        <td>${descuento.toFixed(2)}</td>
                        <td>${importe.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>No hay multas registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        
        {visible &&(
        <div className="form-group">
          <table className="table-result">
            <tbody>
              <tr>
                <td className="tdtable">Monto Total: <span className='tdspan'>$ {formatoDecimal(montoTotal)}</span></td>
              </tr>
              <tr>
                <td className="tdtable">Descuentos: <span className='tdspan'>$ {formatoDecimal(descuentoTotal)}</span></td>
              </tr>
              <tr>
                <td className="tdtable">Total a Pagar: <span className='tdspan'>$ {formatoDecimal(totalPagar)}</span></td>
              </tr>
            </tbody>
          </table>

          <button type='button' id="BotonPagar" >Pagar</button>
        </div>
        )}
        
         
        {/* Cards */}
        {visible &&(
        <div className="card-wrapper">
          {infracciones.length > 0 ? (

            infracciones.map((infraccion, index) => {
              const { importe, descuento, fechaCapitalizada } = procesarAdeudos(infraccion);
              return (
                <div className="card" key={index}>
                  <div className="card-header">Multa #{index + 1}</div>
                  <div className="card-body">
                    <div className="card-item">
                      <span>Boleta:</span>
                      <span>{infraccion[0]}</span>
                    </div>
                    <div className="card-item">
                      <span>Placa:</span>
                      <span>{infraccion[1]}</span>
                    </div>
                    <div className="card-item">
                      <span>Fecha Infracción:</span>
                      <span>{fechaCapitalizada}</span>
                    </div>
                    <div className="card-item">
                      <span>Infracción:</span>
                      <span>{infraccion[3]}</span>
                    </div>
                    <div className="card-item">
                      <span>Descripción:</span>
                      <span>{infraccion[4]}</span>
                    </div>
                    <div className="card-item">
                      <span>Descuento:</span>
                      <span>${descuento.toFixed(2)}</span>
                    </div>
                    <div className="card-item">
                      <span>Monto:</span>
                      <span>${importe.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    Total a Pagar: ${(importe - descuento).toFixed(2)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card">
              <div className="card-header">Sin Resultados</div>
              <div className="card-body">
                <p>No hay multas registradas.</p>
              </div>
              <div className="card-footer"></div>
            </div>
          )}
        </div>
        )}
        {/* Totales */}
        {visible &&(
        <div className="form-group-cards">
          <table className="table-result">
            <tbody>
              <tr>
              <td className="tdtable">Monto Total: <span className="tdspan">${formatoDecimal(montoTotal)}</span></td>
              </tr>
              <tr>
              <td className="tdtable">Descuentos: <span className="tdspan">${formatoDecimal(descuentoTotal)}</span></td>
              </tr>
              <tr>
              <td className="tdtable">Total a Pagar: <span className="tdspan">${formatoDecimal(totalPagar)}</span></td>
              </tr>
            </tbody>
          </table>

          <button type='button' id="BotonPagarCard">Pagar</button>
        </div>
        )}

      
      </form>

        
      
    </div>

    
  );
}
export default Placas;