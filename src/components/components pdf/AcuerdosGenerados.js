import React from 'react'
// import { tamañoInvitados } from './PersonalInvitado';
import Acuerdos from './acuerdos.json'




function AcuerdosGenerados(props) {
  const tamaño = props.data.usuario_id.length.length;
  const tamAcuerdos = props.dataAcu;
  // console.log(tamAcuerdos);

  const containerClass = (tamAcuerdos >= 15) || (tamaño >= 17 && tamAcuerdos >= 20) || tamaño >= 30
  ? "contenedor bu pepe"
  : "contenedor bu";

return (
  <div className={containerClass}>
    <div className="cont1">
      <h3>Acuerdos generados en la ultima reunion</h3>
    </div>
    <div className="cuart-cont2">
      <div className="cuart1-cab">
        <div className="center"><h5>Acuerdo</h5></div>
        <div className="center"><h5>Responsable</h5></div>
        <div className="center"><h5>Fecha de Compromiso</h5></div>
      </div>
      <div className="cuart2-bod">
        <div className="center">Mejorar la Dinamica que tiene el sitio</div>
        <div className="center">Oscar Alfredo Diaz</div>
        <div className="center"><p>2023-05-05</p></div>
      </div>
      <div>

      </div>
    </div>
  </div>
);

  
}

export default AcuerdosGenerados