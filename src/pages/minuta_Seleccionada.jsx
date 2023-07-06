import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../assets/styles/inicio.css";
import "../assets/styles/acuerdos.css";
import { useParams } from "react-router-dom";
import { Acuerdos } from "../components/Acuerdo";

const MinutaSeleccionada = () => {
  const { id } = useParams();
  console.log(id);

  const [acuerdoData, setAcuerdoData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/agreement/`);
        setAcuerdoData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  let AcuerdoD;
  
  if (acuerdoData) {
    AcuerdoD = acuerdoData
      .filter((u) => u.minuta_id ===id)
      .map((u) => (
        <Acuerdos key={u.id} {...u}  />
      ));
  } 

  return (
    <div className="contenedor">
      <div className="contenedor_acuerdos">
        <div className="arriba">
          <div>Atras</div>
          <div className="Botones_acuerdos">
            <Link className="btnconclucion">
              Conclusión de la reunión
            </Link>
            <Link to={`/minutas/${id}/generaracuerdo`} className="btncrearacuerdo">
              Añadir acuerdo +
            </Link>
          </div>
        </div>
        <div className="abajo">
          <h4 className="tituloMinuta_Acuerdo">{id}</h4>
          {AcuerdoD}
        </div>
      </div>
    </div>
  );
};

export default MinutaSeleccionada;
