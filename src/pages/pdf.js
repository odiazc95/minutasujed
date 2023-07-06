import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/pdf.css";
import InformacionGeneral from '../components/components pdf/InformacionGeneral'
import Uni from "../components/components pdf/Uni";
import OrdenDia from "../components/components pdf/OrdenDia";
import PersonalInvitado from "../components/components pdf/PersonalInvitado";
import SeguimientoAcuerdos from "../components/components pdf/SeguimientoAcuerdos";
import AcuerdosGenerados from "../components/components pdf/AcuerdosGenerados";
import Button from '../components/components pdf/Button';
import { useParams } from "react-router-dom";
import html2pdf from 'html2pdf.js'

const generatePDF = () => {
  const element = document.getElementById('divToPrint'); // ID del elemento HTML que deseas convertir a PDF

  html2pdf()
    .from(element)
    .set({ 
      margin:5 , 
      filename: 'archivo.pdf',
      jsPDF: { 
        format: 'letter',
        orientation: 'portrait',
      },
      html2canvas: { 
        scale: 2, 
      },
      pagebreak: { 
        before: '#elementoSiguiente',
        after:'#elementoSiguiente2'
      },
      pageMargins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      },
      onBeforeSave: function() {
        // Agregar estilos CSS para el padding
        var style = document.createElement('style');
        style.innerHTML = `
          .pagina {
            padding: 20px;
          }
          .elementoSiguiente-pagebreak {
            page-break-after: avoid;
          }
        `;
        document.head.appendChild(style);
      },
    })
    .save();
};

const PDFViewer = () => {
  const {idM} = useParams();
  console.log("aaaaaaaaaaaaaaaaaaaaa");
  console.log(idM);
  const [minutaData, setMinutaData] = useState(null);
  const [acuerdoData, setAcuerdoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/minutes/${idM}`);
        setMinutaData(response.data); 
        const responseAcuerdos = await axios.get(`http://localhost:3001/agreement`);
        setAcuerdoData(responseAcuerdos.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, ["idM"]);


  if(minutaData){
    return (
      <div id="divToPrint">
        <div className="cont-general">
          <section className="part1">
            {minutaData && acuerdoData ? (
              <>
                <Uni data={minutaData}/>
                <InformacionGeneral data={minutaData} dataAcu={acuerdoData}/>
                <OrdenDia data={minutaData} dataAcu={acuerdoData}/>
                <PersonalInvitado data={minutaData} dataAcu={acuerdoData}/>
              </>
            ) : (
              <p>Cargando datos...</p>
            )}
          </section>
          <section className="part2">
            {minutaData && acuerdoData  ? (
              <>
                <SeguimientoAcuerdos data={minutaData} dataAcu={acuerdoData}/>
                <AcuerdosGenerados data={minutaData} dataAcu={acuerdoData}/>
              </>
            ) : (
              <p>Cargando datos...</p>
            )}
          </section>
        </div>
      <button onClick={generatePDF}>Generar PDF</button>

      </div>

    );
  }else{
    console.log("Errorrrrrrrrrrrrrrrrrr");
  }
};

export default PDFViewer;
