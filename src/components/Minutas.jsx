import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  AiFillFileText,
  AiFillCheckCircle,
  AiFillFilePdf,
  AiFillCopy,
} from "react-icons/ai";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import EliminarMinuta from "../actions/eliminarMinuta";
import TerminarMinuta from '../actions/terminarMinuta';
import Sw from "sweetalert2";


export const Activa = (minuta) => {
  const [eliminarMinutaVisible, setEliminarMinutaVisible] = useState(false);
  const [terminarMinutaVisible, setTerminarMinutaVisible] = useState(false);

  const handleEliminarClick = () => {
    setEliminarMinutaVisible(true);

  };
  const handleTerminarClick = () => {
    setTerminarMinutaVisible(true);

  };
  if (minuta.estatus === "Activo") {
    return (
      <div className="minuta">
        <div className="informacion">
          <p className="Titminuta textminuta nombre">{minuta.nombre}</p>
          <p className="textminuta responsable_establecido">
            <p className="Titulos">Tema: </p>
            <p>{minuta.tema}</p>
          </p>
          <p className="textminuta area_establecida">
            <p className="Titulos">Area: </p>
            <p>{minuta.area}</p>
          </p>
          <p className="textminuta fecha_establecida">
            <p className="Titulos">Fecha: </p>
            <p>{minuta.fecha}</p>
          </p>
          <p className="textminuta hora_establecida">
            <p className="Titulos">Hora: </p>
            <p>{minuta.hora}</p>
          </p>
        </div>
        <div className="botones">
        <div className="botones">
        <div className="el-ed">
          <button className="eliminar btn-minuta" onClick={handleEliminarClick}>
            <FaTrash />
          </button>
          {eliminarMinutaVisible && <EliminarMinuta id={minuta._id} />}
          <Link
            to={`/minutas/editar/${minuta._id}`}
            className="editar btn-minuta"
          >
            <MdModeEdit />
          </Link>
          
        </div>
      </div>
          <Link
            to={`/minutas/${minuta._id}`}
            className="detalles btn-minuta"
          >
            <AiFillFileText className="icon-minuta" />
            Detalles
          </Link>
          <button className="terminar btn-minuta" onClick={handleTerminarClick}>
            <AiFillCheckCircle className="icon-minuta" />
            Terminar
          </button>
          {terminarMinutaVisible && <TerminarMinuta id={minuta._id} />}

        </div>
      </div>
    );
  }
};

export const Finalizada = (minuta) => {
  if (minuta.estatus === "Inactivo") {
    return (
      <div className="minuta">
        <div className="informacion">
          <p className="Titminuta textminuta nombre">{minuta.nombre}</p>
          <p className="textminuta responsable">
            <p className="Titulos">Tema: </p>
            <p>{minuta.tema}</p>
          </p>
          <p className="textminuta area">
            <p className="Titulos">Area: </p>
            <p>{minuta.area}</p>
          </p>
          <p className="textminuta fecha">
            <p className="Titulos">Fecha: </p>
            <p>{minuta.fecha}</p>
          </p>
          <p className="textminuta hora">
            <p className="Titulos">Hora: </p>
            <p>{minuta.hora}</p>
          </p>
        </div>
        <div className="botones">
            <Link to={`/pdf/${minuta._id}`} className="pdf btn-minuta">
            <AiFillFilePdf className="icon-minuta" />
              PDF
            </Link>
          
          {/* <button className="adjunto btn-minuta">
            <AiFillCopy className="icon-minuta" />
            Adjunto
          </button> */}
          <button className="resumen btn-minuta">
            <BsFillBookmarkStarFill className="icon-minuta" />
            Resumen
          </button>
        </div>
      </div>
    );
  }
};


