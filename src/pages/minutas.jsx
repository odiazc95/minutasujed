import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../assets/styles/minutas.css";
import { Activa } from "../components/Minutas";
import { Finalizada } from "../components/Minutas";
import { AiOutlineSearch, AiTwotoneFilter } from "react-icons/ai";
import Cookies from 'js-cookie';

const Minutas = () => {

  

  const idUserCoockie = Cookies.get('idUser');
  const UserNameCoockie = Cookies.get('UserName');
  console.log("--------------Coockies----------------");
  console.log(idUserCoockie);
  const [minutaData, setMinutaData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/minutes/`);
        setMinutaData(response.data); 
        console.log("aaaaaaaaaaaaaaaaaaaaaaa");
        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  


  let minutaA, minutaF;
  if (minutaData) {
    minutaA = React.Children.toArray(
      minutaData.map((u) => <Activa {...u} />)
    );
    minutaF = React.Children.toArray(
      minutaData.map((u) => <Finalizada {...u} />)
    );
  }else{
    console.log("------------------------");
  }

  return (
    <div className="contenedor">
      <div className="contenedor_minutas">
        <div className="arriba">
          <div className="cont-busqueda">
            <div className="busqueda">
              <AiOutlineSearch className="iconos_minuta" />
              <input className="search" type="text" placeholder="Buscar" />
              <div className="botonIr">
                <p>Ir</p>
              </div>
            </div>
            <div className="filtro">
              <AiTwotoneFilter className="iconos_minuta" />
            </div>
          </div>
          <Link to="/minutas/generaminuta" className="btncrearminuta">
            Crear minuta +
          </Link>
        </div>
        <div className="abajo">
          <h4 className="estado">Activas</h4>
          {minutaA}
          <h4 className="estado">Finalizadas</h4>
          {minutaF}
        </div>
      </div>
    </div>
  );
};

export default Minutas;
