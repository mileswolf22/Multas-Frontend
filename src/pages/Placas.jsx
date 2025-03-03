import '../styles/Placas.css'
import { useState } from "react";
import axios from "axios";
import LoadingModal from '../pages/ModalLoad'
import DOMPurify from "dompurify";
import { format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import visa from '../../public/visa.png'
import openpay from '../../public/openpay.png'
import security from '../../public/security.png'
import verify from '../../public/verified-by-visa.png'
import mastercard from '../../public/Mastecard-Securecode.png'

function Placas() {
  const [inputValue, setInputValue] = useState("");
  const [infracciones, setInfracciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visiblePago, setVisiblePago] = useState(false);
  const [cardMode, setcardMode] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [dateYear, setDateYear] = useState("");
  const [code, setCode] = useState("");

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
        const response = await axios.get(`http://192.168.252.1:5000/api/infracciones/?placa=${safeData}`);
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

  const seccionPago = () =>{
    setVisiblePago(true)
  }

  const clearTable = () => {
    setInfracciones([])
  }

  const debitCardMode = (e) =>{
    let value = e.target.value;
    // Permite solo números y bloquea cualquier otro carácter
    value = value.replace(/\D/g, "");

    // Limita la entrada a 16 caracteres
    if (value.length > 16) return;

    setcardMode(value);
  }

  const dateModeMonth = (e) =>{
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if(value.length > 2) return;

    setDateMonth(value);
  }

  const dateModeYear = (e) =>{
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if(value.length > 2) return;

    setDateYear(value);
  }

  const codeMode = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if(value.length > 3) return;

    setCode(value);
  }

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

      if(importe === null){
        importe = 0
      }else if(importe === ""){
        importe = 0;
      }else{
        if(descuento === null){
          descuento = 0;
        }else if(descuento === ""){
          descuento = 0;
        }else{
          //Aqui deberia hacer el calculo del descuento
          descuento = "";
        }
      }
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
          )}
        
        {visible &&(
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

          <button type='button' id="BotonPagar" onClick={seccionPago}>Pagar</button>
        </div>
        )}

        
          <div className="SeccionPago">
            {visiblePago &&(
              <form className="Form" action="">
                <div className="Pago-content">
                  <p id="titulo-pagar">Pagar</p>

                  <div className="Pago__Contacto">
                    <div className="Contacto__Header">
                        <p id="datos-contacto">Datos de Contacto</p>
                    </div>
                    <div className="Contacto__Datos">
                        <p id="email">Email *</p>
                        <input required type="email" placeholder='ejemplo@gmail.com'></input>
                        <p id="comprobantes">Los comprobantes de pago llegarán a este correo</p>
                    </div>
                  </div>

                  <div className="Pago__Forma">
                    <div className="Forma__Header">
                      <p>Forma de Pago (crédito o débito)</p>
                    </div>

                    <div className="Forma__Datos">
                        <div className="Datos__Content">
                          <div className="Datos__Content__Header">
                              <p id="visaP"><span><img src={visa} id="visa"/></span>    Visa/Masterdard</p>
                          </div>
                          <div className="Border"></div>
                          <div className="Datos__Content--datos">
                            <div className="datos-titular">
                                <p htmlFor="">Nombre del Titular</p>
                                <input type="text" required placeholder='Como aparece en la tarjeta'/> 
                            </div>
                            <div className="datos-tarjeta">
                                <div className="datos-delanteros">
                                  <p htmlFor="">Numero de Tarjeta</p>
                                  <input type="number" required value={cardMode} autocomplete="cc-number" inputmode="numeric" placeholder="XXXX XXXX XXXX XXXX" onChange={debitCardMode}/>
                                </div>

                                <div className='datos-traseros'>
                                    <div className="FechaExpiracion">
                                          <p htmlFor="">Fecha de Expiracion</p>
                                          <input type="text" id="dateMonth" required placeholder='MM' value={dateMonth} onChange={dateModeMonth}/>
                                          <input type="text" id="dateYear" required placeholder='YY' value={dateYear} onChange={dateModeYear}/>
                                     </div>
                                     <div className="CodigoSeguridad">
                                          <p htmlFor="">Codigo de Seguridad</p>
                                          <input type="text" id="code" required placeholder='3 dígitos' value={code} onChange={codeMode}/>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="Pago__Icons">
                      <div className="Icons--seguridad--izq">
                        <img src={mastercard} alt="" />
                        <img src={verify} alt="" />
                      </div>

                      <div className="Icons--seguridad--der">
                          <p>Transacciones realizadas vía:</p>
                          <img src={openpay} alt="" />                        
                      </div>

                      <div className="secure">
                          <p>Tus pagos se realizan de forma segura con encriptación de 256 bits</p>
                          <img src={security} alt="" />
                      </div>
                  </div>
                  <div className="Pago__Btn"> 
                      <button type="submit" id="BotonPagar">Pagar</button>
                  </div>
                </div>
              </form>
            )}
          </div>
        
         
        {/* Cards */}
        {visible &&(
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
        )}
        {/* Totales */}
        {visible &&(
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

          <button type='button' id="BotonPagarCard" onClick={seccionPago}>Pagar</button>
        </div>
        )}

        <div className="SeccionPagoCard">
            {visiblePago &&(
              <form className="Form" action="">
                <div className="Pago-content">
                  <p id="titulo-pagar">Pagar</p>

                  <div className="Pago__Contacto">
                    <div className="Contacto__Header">
                        <p>Datos de Contacto</p>
                    </div>
                    <div className="Contacto__Datos">
                        <p>Email</p>
                        <input placeholder='ejemplo@gmail.com'></input>
                        <p id="comprobantes">Los comprobantes de pago llegarán a este correo</p>
                    </div>
                  </div>

                  <div className="Pago__Forma">
                    <div className="Forma__Header">
                      <p>Forma de Pago (crédito o débito)</p>
                    </div>

                    <div className="Forma__Datos">
                        <div className="Datos__Content">
                          <div className="Datos__Content__Header">
                            <p id="visaP"><span><img src='../public/visa.png' id="visa"/></span>Visa/Masterdard</p>
                          </div>
                          <div className="Border"></div>
                          <div className="Datos__Content--datos">
                            <div className="datos-titular">
                                <label htmlFor="">Nombre del Titular</label>
                                <input type="text" placeholder='Como aparece en la tarjeta'/> 
                            </div>
                            <div className="datos-tarjeta">
                                <div className="datos-delanteros">
                                  <label htmlFor="">Numero de Tarjeta</label>
                                  <input type="text" placeholder='XXXX XXXX XXXX XXXX'/>
                                </div>

                                <div className='datos-traseros'>
                                    <div className="FechaExpiracion">
                                          <label htmlFor="">Fecha de Expiracion</label>
                                          <input type="text" value={dateMonth} onChange={dateModeMonth} placeholder='MM'/>
                                          <input type="text" value={dateYear} onChange={dateModeYear}  placeholder='YY'/>
                                    </div>
                                    <div className="CodigoSeguridad">
                                          <label htmlFor="">Codigo de Seguridad</label>
                                          <input type="text" value={code} onChange={codeMode} placeholder='3 dígitos'/>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="Pago__Icons">
                      <div className="Icons--seguridad--izq">
                        <img src={mastercard} alt="" />
                        <img src={verify} alt="" />
                      </div>

                      <div className="Icons--seguridad--der">
                          <p>Transacciones realizadas vía:</p>
                          <img src={openpay} alt="" />                        
                      </div>

                      <div className="secure">
                          <p>Tus pagos se realizan de forma segura con encriptación de 256 bits</p>
                          <img src={security} alt="" />
                      </div>
                  </div>
                  <div className="Pago__Btn"> 
                      <button type="submit" id="BotonPagarCard">Pagar</button>
                  </div>
                </div>
              </form>
            )}
          </div>


      </form>

        
      
    </div>

    
  );
}
export default Placas;