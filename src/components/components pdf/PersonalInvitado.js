import React, { useEffect, useState } from 'react';
// import Invitados from './invitados.json';
import Acuerdos from './acuerdos.json';
import axios from 'axios';



function PersonalInvitado(props) {
  
    const tamañoInvitados =props.data.usuario_id.length ;
  const tamAcuerdos = props.dataAcu;
  const [usuarioData, setUsuariosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = props.data.usuario_id.map(async (usuario) => {
          const response = await axios.get(`http://localhost:3001/users/${usuario}`);
          return response.data;
        });

        const userData = await Promise.all(promises);
        setUsuariosData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.data.usuario_id]);

  const wordsCount = props.data.descripcion.trim().split(/\s+/).length;

  const invitados = usuarioData.map((item, index) => {
    let className = "cuart2-bod";
    if (wordsCount >= 150 && wordsCount < 180) {
      if (index === 14 || index === 30) {
        className += " pepe1";
      } else if (index === 15 || index === 32) {
        className += " pepe";
      }
    } else if (wordsCount >= 180 && wordsCount < 200) {
      if (index === 0) {
        className += " pepe1";
      } else if (index === 1) {
        className += " pepe";
      }
    }

    return (
      <div className={className} id={index === 14 || index === 31 ? "elementoSiguiente2" : ""} key={index}>
        <div className="center">{index === 14 ? "a---" : index === 15 ? "b---" : ""}{item.nombre}</div>
        <div className="center">{item.cargo}</div>
        <div className="center">
          <p>{item.firma}</p>
        </div>
      </div>
    );
  });

  const containerClassName =
    (tamañoInvitados >= 9 && tamañoInvitados <= 15) ||
    (tamañoInvitados >= 18 && tamAcuerdos >= 10) ||
    tamañoInvitados >= 25
      ? "contenedor personalInvitado pepe1"
      : "contenedor personalInvitado pepe";

  return (
    <div className={containerClassName} id={(tamañoInvitados >= 9 && tamañoInvitados <= 15) || (tamañoInvitados >= 18 && tamAcuerdos >= 10) || tamañoInvitados >= 25 ? "elementoSiguiente2" : ""}>
      <div className="cont1">
        <h3>Personal Invitado a la Reunion</h3>
      </div>

      <div className="cuart-cont2">
        <div className="cuart1-cab">
          <div className="center">
            <h5>Nombre</h5>
          </div>
          <div className="center">
            <h5>Cargo</h5>
          </div>
          <div className="center">
            <h5>Firma</h5>
          </div>
        </div>
        {invitados}
      </div>
    </div>
  );
}

export default PersonalInvitado;
