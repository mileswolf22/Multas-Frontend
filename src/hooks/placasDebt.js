import {es} from 'date-fns/locale'
import { format } from 'date-fns';
export function procesarAdeudos(infraccion) {
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

    

    const fechaFormateada = format(new Date(infraccion[2]), 'dd/MM/yyyy HH:mm', { locale: es });
    const fechaCapitalizada = fechaFormateada.replace(/\b\w/g, (char) => char.toUpperCase());

    return { ViewBag, bloqueado, ESTATUS, total, pagado, importe, descuento, fechaCapitalizada };
  }

  