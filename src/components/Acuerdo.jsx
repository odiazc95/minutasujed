import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import EliminarAcuerdo from "../actions/eliminarAcuerdo";


export const Acuerdos = (acuerdo) => {
  const [userRCData, setUserRCData] = useState(null);
  const [userRRData, setUserRRData] = useState(null);
  const [eliminarAcuerdoVisible, setEliminarAcuerdoVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRC = await axios.get(
          `http://localhost:3001/users/${acuerdo.responsablec_id}`
        );
        setUserRCData(responseRC.data);
        const responseRR = await axios.get(
          `http://localhost:3001/users/${acuerdo.responsabler_id}`
        );
        setUserRRData(responseRR.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [acuerdo.responsablec_id, acuerdo.responsabler_id]);

  const handleEliminarClick = () => {
    setEliminarAcuerdoVisible(true);
  };

  return (
    <div className="acuerdo">
      <div className="informacion">
        <p className="textacuerdo responsable_establecido">
          <p className="Titulos">Titulo: </p>
          <p>{acuerdo.acuerdo}</p>
        </p>
        <p className="textacuerdo area_establecida">
          <p className="Titulos">Responsable de revisar: </p>
          <p>{userRRData?.nombre}</p>
        </p>
        <p className="textacuerdo fecha_establecida">
          <p className="Titulos">Responsable de cumplir: </p>
          <p>{userRCData?.nombre}</p>
        </p>
        <p className="textacuerdo hora_establecida">
          <p className="Titulos">Fecha de compromiso: </p>
          <p>{acuerdo.fecha}</p>
        </p>
        <p className="textacuerdo hora_establecida">
          <p className="Titulos">Estatus: </p>
          <p>{acuerdo.estatus}</p>
        </p>
      </div>
      <div className="botones">
        <div className="el-ed">
          <button className="eliminar btn-acuerdo" onClick={handleEliminarClick}>
            <FaTrash />
          </button>
          {eliminarAcuerdoVisible && <EliminarAcuerdo id={acuerdo._id} />}
          <Link  
          to={`/acuerdos/editar/${acuerdo._id}`} 
          className="editar btn-acuerdo">
            <MdModeEdit />
          </Link>
        </div>
        <Link
          to={`/minutas/${acuerdo._id}/seguimiento`}
          className="detallesAcuerdo btn-acuerdo"
        >
          <AiFillFileText className="icon-acuerdo" />
          Seguimiento
        </Link>
      </div>
    </div>
  );
};
