import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/inicio.css";
import "../assets/styles/acuerdos.css";
import { Acuerdos } from "../components/Acuerdo";
import { Text, Title, Icon, Divider, Button } from "@tremor/react";
import { PlusCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

const MinutaSeleccionada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [acuerdoData, setAcuerdoData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/agreement/`);
        // setAcuerdoData(response.data);
        setAcuerdoData(response.data.filter((u) => u.minuta_id ===id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // let AcuerdoD;
  
  // if (acuerdoData) {
  //   AcuerdoD = acuerdoData
  //     .filter((u) => u.minuta_id ===id)
  //     .map((u) => (
  //       <Acuerdos key={u.id} {...u}  />
  //     ));
  // } 

  return (
    // <div className="contenedor">
    //   <div className="contenedor_acuerdos">
    //     <div className="arriba">
    //       <div>Atras</div>
    //       <div className="Botones_acuerdos">
    //         <Link className="btnconclucion">
    //           Conclusión de la reunión
    //         </Link>
    //         <Link to={`/minutas/${id}/generaracuerdo`} className="btncrearacuerdo">
    //           Añadir acuerdo +
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="abajo">
    //       <h4 className="tituloMinuta_Acuerdo">{id}</h4>
    //       {AcuerdoD}
    //     </div>
    //   </div>
    // </div>
    <>
      <div className='w-full flex flex-col md:flex-row justify-between'>

        <Icon className='w-10 h-10 cursor-pointer' 
          icon={ ArrowUturnLeftIcon } 
          onClick={ () => navigate(-1) } 
          variant='solid' 
          color='red'
          tooltip='Regresar'
        />

        <div className='w-full justify-center md:justify-end flex gap-1 md:gap-4 mt-4 md:mt-0'>
          <Button
            variant='secondary'
            color='red'
            onClick={ () => navigate(`/Dash/minutas/${id}/conclusion`) }
          >
            Conclusión de la reunión
          </Button>

          <Button
            icon={ PlusCircleIcon }
            iconPosition='right'
            color='red'
            onClick={ () => navigate(`/Dash/minutas/${id}/generaracuerdo`) }
          >
            Añadir acuerdo
          </Button>
        </div>

      </div>

      <Title className='mt-4 md:mt-7'>
        { id }
      </Title>
      <Divider className='mt-2'/>
      {
        acuerdoData.length > 0 
        ? acuerdoData.map((u) => (
          <Acuerdos key={u.id} {...u}  />
        ))
        : <Text className='mt-4'>
            No hay acuerdos registrados
          </Text>
      }
    </>
  );
};

export default MinutaSeleccionada;
