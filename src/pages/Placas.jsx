import '../styles/Placas.css'
import { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { format } from 'date-fns';

function Placas() {
  const [inputValue, setInputValue] = useState("");
  const [infracciones, setInfracciones] = useState([]);

  const handleInputChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const safeData = DOMPurify.sanitize(inputValue);
    try {
      console.log("Realizando consulta...");
      const response = await axios.get(`http://localhost:5000/api/infracciones/?placa=${safeData}`);

      console.log(JSON.stringify(response.data, null, 2));

      setInfracciones(response.data); 
    } catch (error) {
      console.error("Error en la consulta:", error);
    }
  };

  function procesarAdeudos(infraccion) {
    let ViewBag = {};
    let bloqueado = "";
    let ESTATUS = "";
    let total = 0;
    let pagado = true;

    let concepto = infraccion[6];
    let estatus = infraccion[7];
    let descuento = infraccion[8] ? parseFloat(infraccion[8]) : 0;
    let importe = infraccion[5] ? parseFloat(infraccion[5]) : 0;

    if (concepto === "700130" || concepto === "700819") {
      ViewBag.Mensaje = "Acudir a la Dirección de Tránsito de Monterrey en Abraham Lincoln 300, esquina con Refugio Velázquez, Col. Morelos CP 64330.";
      bloqueado = "Bloqueado";
    } else if (concepto === "990999") {
      ViewBag.Mensaje = "Acudir a la Dirección de Daños Municipales en Abraham Lincoln 300, esquina con Refugio Velázquez, Col. Morelos CP 64330.";
      bloqueado = "Bloqueado";
    }

    if (estatus === "1") {
      ESTATUS = "Pagado";
    } else if (estatus === "2") {
      ESTATUS = "Pendiente de pago";
    } else {
      ESTATUS = "";
    }

    if (estatus !== "2") {
      total = 0;
    } else {
      pagado = false;
    }

    return { ViewBag, bloqueado, ESTATUS, total, pagado, importe, descuento };
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

  return (
    <div className="consulta__formulario">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form--placa">
          <p>Placa: </p>
          <input id="input" type="text" value={inputValue} onChange={handleInputChange} />
          <button id="button" type="submit">Buscar</button>
        </div>

        <div className="form--table">
          <table className="table" border={1}>
            <thead>
              <tr>
                <th scope="col" className="table-header">Boleta</th>
                <th scope="col" className="table-header">Placa</th>
                <th scope="col" className="table-header">Fecha Infracción</th>
                <th scope="col" className="table-header">Infracción</th>
                <th scope="col" className="table-header">Descripción</th>
                <th scope="col" className="table-header">Descuento</th>
                <th scope="col" className="table-header">Monto</th>
              </tr>
            </thead>
            <tbody>
              {infracciones.length > 0 ? (
                infracciones.map((infraccion, index) => {
                  const { importe, descuento } = procesarAdeudos(infraccion);
                  return (
                    <tr key={index}>
                      <td>{infraccion[0]}</td>
                      <td>{infraccion[1]}</td>
                      <td>{format(new Date(infraccion[2]), 'dd MMMM yyyy HH:mm:ss')}</td>
                      <td>{infraccion[3]}</td>
                      <td>{infraccion[4]}</td>
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

        <div className="form-group">
          <table className="table-result">
            <tbody>
              <tr>
                <td className="tdtable">Monto Total: <span className="tdspan">${montoTotal.toFixed(2)}</span></td>
              </tr>
              <tr>
                <td className="tdtable">Descuentos: <span className="tdspan">${descuentoTotal.toFixed(2)}</span></td>
              </tr>
              <tr>
                <td className="tdtable">Total a Pagar: <span className="tdspann">${totalPagar.toFixed(2)}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="card-wrapper">
          {infracciones.length > 0 ? (
            infracciones.map((infraccion, index) => {
              const { importe, descuento } = procesarAdeudos(infraccion);
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
                      <span>{format(new Date(infraccion[2]), 'dd MMMM yyyy HH:mm:ss')}</span>
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

        {/* Totales */}
        <div className="form-group-cards">
          <table className="table-result">
            <tbody>
              <tr>
              <td className="tdtable">Monto Total: <span className="tdspan">${montoTotal.toFixed(2)}</span></td>
              </tr>
              <tr>
              <td className="tdtable">Descuentos: <span className="tdspan">${descuentoTotal.toFixed(2)}</span></td>
              </tr>
              <tr>
              <td className="tdtable">Total a Pagar: <span className="tdspann">${totalPagar.toFixed(2)}</span></td>
              </tr>
            </tbody>
          </table>
        </div>


      </form>
    </div>

    
  );
}
export default Placas;