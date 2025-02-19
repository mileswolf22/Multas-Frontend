import React, { useState, useEffect } from 'react';
import '../styles/Placas.css'

function Placas() {
  const [multas, setMultas] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [placa, setPlaca] = useState('');

  // Obtener los datos del JSON (simulado con fetch en este caso)
  useEffect(() => {
    // Aquí debes colocar la URL de tu API o fuente de datos
    fetch('URL_API')  // Reemplaza con tu API real
      .then(response => response.json())
      .then(data => setMultas(data)) // Asigna los datos al estado
      .catch(error => console.error('Error fetching data:', error));
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  // Función para manejar la búsqueda
  const handleBuscar = () => {
    if (placa.trim() !== '') {
      setBusquedaRealizada(true);
    }
  };

//   return (
//     <div className="container" style={{ marginTop: '5%' }}>
//       <h2 style={{ fontWeight: 'bold' }}>Consulta y Pago de Infracciones</h2>
//       <p>Para consultar tus multas de tránsito, teclea tu placa sin guiones ni espacios.</p>

//       {/* Formulario de búsqueda */}
//       <div className="row mb-3">
//         <div className="col-12 col-md-8">
//           <input
//             type="text"
//             value={placa}
//             onChange={(e) => setPlaca(e.target.value.toUpperCase())}
//             maxLength="9"
//             placeholder="Placa"
//             id="placa"
//             required
//             name="placa"
//             className="form-control"
//           />
//         </div>
//         <div className="col-12 col-md-4">
//           <button className="btn btn-info w-100" onClick={handleBuscar}>
//             Buscar
//           </button>
//         </div>
//       </div>

//       {/* Mostrar tabla solo después de la búsqueda en pantallas grandes */}
//       {busquedaRealizada && (
//         <>
//           {/* En pantallas grandes, mostramos la tabla */}
//           <div className="table-wrapper">
//             <table className="table" style={{ display: 'table' }}>
//               <thead>
//                 <tr>
//                   <th>Boleta</th>
//                   <th>Placa</th>
//                   <th>Fecha Infracción</th>
//                   <th>Infracción</th>
//                   <th>Descripción</th>
//                   <th>Descuento</th>
//                   <th>Monto</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {multas.length > 0 ? (
//                   multas.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.boleta}</td>
//                       <td>{item.placa}</td>
//                       <td>{item.fechaInfraccion}</td>
//                       <td>{item.infraccion}</td>
//                       <td>{item.descripcion}</td>
//                       <td>{item.descuento}</td>
//                       <td>{item.monto}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" style={{ textAlign: 'center' }}>No se encontraron multas</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* En pantallas pequeñas, mostramos las tarjetas */}
//             <div className="card-wrapper">
//               {multas.length > 0 ? (
//                 multas.map((item, index) => (
//                   <div className="card" key={index}>
//                     <div className="card-header">Boleta: {item.boleta}</div>
//                     <div className="card-body">
//                       <div className="card-item">
//                         <span><strong>Placa:</strong> {item.placa}</span>
//                         <span><strong>Fecha:</strong> {item.fechaInfraccion}</span>
//                       </div>
//                       <div className="card-item">
//                         <span><strong>Infracción:</strong> {item.infraccion}</span>
//                         <span><strong>Descripción:</strong> {item.descripcion}</span>
//                       </div>
//                       <div className="card-item">
//                         <span><strong>Descuento:</strong> {item.descuento}</span>
//                         <span><strong>Monto:</strong> {item.monto}</span>
//                       </div>
//                     </div>
//                     <div className="card-footer">Pagar</div>
//                   </div>
//                 ))
//               ) : (
//                 <div>No se encontraron multas.</div>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );

return (
    <div>
      <div className="container" style={{ backgroundColor: 'white', marginTop: '5%', borderRadius: '12px' }}>
        <div className="table-responsive">
          {/* Aquí iría un posible componente de cronómetro, si es necesario */}
        </div>
        <h2 style={{ fontWeight: 'bold' }}>Consulta y Pago de Infracciones</h2>
        <p>Para consultar tus multas de tránsito, teclea tu placa sin guiones ni espacios.</p>
        <table className="table" style={{ borderColor: 'white' }}>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col" style={{ fontWeight: 'bold', fontSize: '17px' }}>
                <label>Placa:</label>
              </th>
              <th scope="col">
                <input
                  type="text"
                  onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
                  maxLength="9"
                  placeholder="Placa"
                  id="placa"
                  required
                  name="placa"
                  className="form-control"
                />
              </th>
              <th scope="col">
                <input type="submit" value="Buscar" id="btnbuscar" className="btn btn-info" />
              </th>
            </tr>
          </thead>
        </table>
        <div className="table-responsive" style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>
          {/* Aquí iría el mensaje que viene de ViewBag */}
        </div>
        <div className="table-responsive" style={{ marginBottom: '10%', fontSize: '12px' }}>
          <table className="table">
            <thead>
              <tr style={{ backgroundColor: '#212529', color: 'white', borderRadius: '12px' }}>
                <th scope="col">Boleta</th>
                <th scope="col">Placa</th>
                <th scope="col">Fecha Infracción</th>
                <th scope="col">Infracción</th>
                <th scope="col">Descripción</th>
                <th scope="col">Descuento</th>
                <th scope="col">Monto</th>
              </tr>
            </thead>
            {/* <tbody>
              
              <tr>
                <td>Boleta</td>
                <td>Placa</td>
                <td>FechaInfraccion</td>
                <td>Infraccion</td>
                <td>Descripcion</td>
                <td>Descuento</td>
                <td>Monto</td>
              </tr>
            </tbody> */}
          </table>
        </div>
        <div className="form-group">
          <table className="table" style={{ width: '100%' }}>
            <tr>
              <td className="tdtable"> Monto Total:</td>
              {/* Aquí debería mostrar el valor total */}
            </tr>
            <tr>
              <td className="tdtable"> Descuentos:</td>
              {/* Aquí debería mostrar el valor de descuentos */}
            </tr>
            <tr>
              <td className="tdtable"> Total a Pagar:</td>
              {/* Aquí debería mostrar el valor total a pagar */}
            </tr>
            <tr>
              <td className="tdtable"> </td>
              <td style={{ float: 'right', fontSize: 'x-large' }}>
                {/* Aquí iría el botón para realizar el pago */}
              </td>
            </tr>
          </table>
        </div>
        <div className="form-group">
          <b><font color="red">PARA REALIZAR SU PAGO ACUDA A SU DELEGACIÓN MÁS CERCANA. TEL. 8183050978</font></b>
          <br />
          <br />
          Para dudas sobre su adeudo llámenos al 81 8305 0900, Ext. 1978
        </div>
        <div className="form-group">
          Para actualizar la página favor de presionar F5
        </div>

        <div className="form-group" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          <a href="http://www.monterrey.gob.mx/pdf/portaln/AvisosPrivacidad/AVISO%20INTEGRAL%20TESORERIA%20MUNICIPAL.pdf" target="_blank" rel="noopener noreferrer">
            Aviso de privacidad
          </a>
        </div>
      </div>

      <input type="hidden" id="HHPlaca" value="" />
      <input type="hidden" id="HHTotal" value="" />
      <input type="hidden" id="HHCarrito" value="" />
      <input type="hidden" id="HHFirma" value="" />
      <input type="hidden" value="" id="tiempo" />

      {/* Modal de mensaje importante */}
      <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ top: '11%', paddingTop: '7%' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Mensaje Importante:</h5>
            </div>
            <div className="modal-body" style={{ fontWeight: 'bold', fontSize: '19px', textAlign: 'justify' }}>
              Las multas se reflejan en el sistema después de 24 horas de haber sido aplicadas de lunes a viernes; o después de 48 horas, si se aplicaron durante el fin de semana. <br />
              <br />
              Para liberación de vehículos detenidos, acudir previamente a la Dirección de Tránsito de Monterrey en Abraham Lincoln 300, esquina Refugio Velázquez, Col. Morelos CP 64330. <br />
              Para dudas sobre su adeudo llámenos al 81 8305 0900 Ext. 1978.
              <div className="row" style={{ textAlign: 'center', marginTop: '2%' }}>
                ¿Desea continuar en el sitio?
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-sm-4">
                  <button type="button" id="BtnLapida" className="btn btn-success" onClick={() => alert('Cerrando...')} style={{ width: '100%', height: '35px' }}>Sí</button>
                </div>
                <div className="col-sm-4">
                  <button type="button" className="btn btn-danger" onClick={() => alert('Cancelando...')} style={{ width: '100%', height: '35px' }}>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal del banco */}
      <div className="modal" id="ModalBanco" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ top: '11%', paddingTop: '7%' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Mensaje Importante:</h5>
            </div>
            <div className="modal-body" style={{ fontWeight: 'bold', fontSize: '17px', textAlign: 'justify' }} id="msjbanco">
              {/* Aquí debería ir el mensaje que viene de JavaScript */}
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-sm-6">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{ width: '100%' }}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Placas;
