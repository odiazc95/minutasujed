import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/lat-bar.css";
import { AiFillHome, AiFillFileText } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaUsers, FaDoorClosed } from "react-icons/fa";
import imge1 from '../assets/img/logoujedblanco.png'

function LatBar() {
  return (
    <nav className="lat-cointainer">
      <div className="top-bar">
            <img className="logo" src={imge1} alt='logo Ujed'/>
            <h2 className="titulo">Gestion de Minutas</h2>
        </div>
      <div className="lat-bar">
        <div className="nav_principal">
          <div className="nav">
            <Link to="/inicio" className="link">
              <AiFillHome className="iconoLatBar" />
              Inicio
            </Link>
          </div>
          <div className="nav">
            <Link to="/minutas" className="link">
              <AiFillFileText className="iconoLatBar" />
              Minutas
            </Link>
          </div>
          <div className="nav">
            <Link to="/perfil" className="link">
              <BsFillPersonFill className="iconoLatBar" />
              Perfil
            </Link>
          </div>
          <div className="nav">
            <Link to="/usuarios" className="link">
              <FaUsers className="iconoLatBar" />
              Usuarios
            </Link>
          </div>
        </div>
        <div className="nav_cerrar">
          <div className="nav cerrar">
            <Link to="/cerrarsesion" className="link">
              <FaDoorClosed className="iconoLatBar" />
              Cerrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LatBar;
