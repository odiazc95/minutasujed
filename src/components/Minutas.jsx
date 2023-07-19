import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  AiFillCheckCircle,
  AiFillFilePdf,
} from "react-icons/ai";
import EliminarMinuta from "../actions/eliminarMinuta";
import TerminarMinuta from '../actions/terminarMinuta';
import { Title, Text, Card, Button } from "@tremor/react";
import { PencilIcon, TrashIcon, ChevronDoubleRightIcon  } from '@heroicons/react/24/outline'


export const Activa = (minuta, updateData) => {
  const [eliminarMinutaVisible, setEliminarMinutaVisible] = useState(false);
  const [terminarMinutaVisible, setTerminarMinutaVisible] = useState(false);

  const navigate = useNavigate();

  const handleEliminarClick = () => {
    setEliminarMinutaVisible(true);

  };
  const handleTerminarClick = () => {
    setTerminarMinutaVisible(true);
  };
  if (minuta.estatus === "Activo") {
    return (
      // <div className="minuta">
      //   <div className="informacion">
      //     <p className="Titminuta textminuta nombre">{minuta.nombre}</p>
      //     <p className="textminuta responsable_establecido">
      //       <p className="Titulos">Tema: </p>
      //       <p>{minuta.tema}</p>
      //     </p>
      //     <p className="textminuta area_establecida">
      //       <p className="Titulos">Area: </p>
      //       <p>{minuta.area}</p>
      //     </p>
      //     <p className="textminuta fecha_establecida">
      //       <p className="Titulos">Fecha: </p>
      //       <p>{minuta.fecha}</p>
      //     </p>
      //     <p className="textminuta hora_establecida">
      //       <p className="Titulos">Hora: </p>
      //       <p>{minuta.hora}</p>
      //     </p>
      //   </div>
      //   <div className="botones">
      //   <div className="botones">
      //   <div className="el-ed">
      //     <button className="eliminar btn-minuta" onClick={handleEliminarClick}>
      //       <FaTrash />
      //     </button>
      //     {eliminarMinutaVisible && <EliminarMinuta id={minuta._id} />}
      //     <Link
      //       to={`/Dash/minutas/editar/${minuta._id}`}
      //       className="editar btn-minuta"
      //     >
      //       <MdModeEdit />
      //     </Link>
          
      //   </div>
      // </div>
      //     <Link
      //       to={`/Dash/minutas/${minuta._id}`}
      //       className="detalles btn-minuta"
      //     >
      //       <AiFillFileText className="icon-minuta" />
      //       Detalles
      //     </Link>
      //     <button className="terminar btn-minuta" onClick={handleTerminarClick}>
      //       <AiFillCheckCircle className="icon-minuta" />
      //       Terminar
      //     </button>
      //     {terminarMinutaVisible && <TerminarMinuta id={minuta._id} />}

      //   </div>
      // </div>
      <Card className='w-full md:max-w-xl mb-5'>
        <div className='flex'>
          <div className='flex flex-col w-8/12'>
            <div className='flex items-center gap-2'>
              <Title>Tema:</Title>
              <Text>{minuta.tema}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Area:</Title>
              <Text>{minuta.area}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Fecha:</Title>
              <Text>{minuta.fecha}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Hora:</Title>
              <Text>{minuta.hora}</Text>
            </div>
          </div>

          <div className="w-4/12 flex flex-col gap-2">
            <Button
              className='w-full'
              icon={ PencilIcon }
              iconPosition='left'
              color='blue'
              size='xs'
              variant='secondary'
              onClick={() => navigate(`/Dash/minutas/editar/${minuta._id}`)}
            >
              Editar
            </Button>
            <Button
              className='w-full'
              icon={ ChevronDoubleRightIcon }
              iconPosition='right'
              color='blue'
              size='xs'
              variant='secondary'
              onClick={() => navigate(`/Dash/minutas/${minuta._id}`)}
            >
              Detalles
            </Button>
            <Button
              className='w-full'
              icon={ TrashIcon }
              iconPosition='left'
              color='red'
              size='xs'
              onClick={handleEliminarClick}
            >
              Eliminar
            </Button>
            {eliminarMinutaVisible && <EliminarMinuta id={minuta._id} />}
          </div>
        </div>
        <div className='w-full mt-2'>
          <Button
            className='w-full'
            icon={ AiFillCheckCircle }
            iconPosition='left'
            color='green'
            size='xs'
            onClick={handleTerminarClick}
          >
            Terminar
          </Button>
          {terminarMinutaVisible && <TerminarMinuta id={minuta._id} />}
        </div>
      </Card>
    );
  }
};

export const Finalizada = (minuta) => {

  const navigate = useNavigate();

  if (minuta.estatus === "Inactivo") {
    return (
      <Card className='w-full md:max-w-xl mb-5'>
        <div className='flex'>
          <div className='flex flex-col w-8/12'>
            <div className='flex items-center gap-2'>
              <Title>Tema:</Title>
              <Text>{minuta.tema}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Area:</Title>
              <Text>{minuta.area}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Fecha:</Title>
              <Text>{minuta.fecha}</Text>
            </div>
            <div className='flex items-center gap-2'>
              <Title>Hora:</Title>
              <Text>{minuta.hora}</Text>
            </div>
          </div>
        </div>
        <div className='w-full mt-2'>
          <Button
            className='w-full'
            icon={ AiFillFilePdf }
            iconPosition='left'
            color='blue'
            size='xs'
            onClick={() => navigate(`/Dash/pdf/${minuta._id}`)}
          >
            PDF
          </Button>
        </div>
      </Card>
      // <div className="minuta">
      //   <div className="informacion">
      //     <p className="Titminuta textminuta nombre">{minuta.nombre}</p>
      //     <p className="textminuta responsable">
      //       <p className="Titulos">Tema: </p>
      //       <p>{minuta.tema}</p>
      //     </p>
      //     <p className="textminuta area">
      //       <p className="Titulos">Area: </p>
      //       <p>{minuta.area}</p>
      //     </p>
      //     <p className="textminuta fecha">
      //       <p className="Titulos">Fecha: </p>
      //       <p>{minuta.fecha}</p>
      //     </p>
      //     <p className="textminuta hora">
      //       <p className="Titulos">Hora: </p>
      //       <p>{minuta.hora}</p>
      //     </p>
      //   </div>
      //   <div className="botones">
      //       <Link to={`/Dash/pdf/${minuta._id}`} className="pdf btn-minuta">
      //       <AiFillFilePdf className="icon-minuta" />
      //         PDF
      //       </Link>
          
      //     {/* <button className="adjunto btn-minuta">
      //       <AiFillCopy className="icon-minuta" />
      //       Adjunto
      //     </button> */}
      //     <button className="resumen btn-minuta">
      //       <BsFillBookmarkStarFill className="icon-minuta" />
      //       Resumen
      //     </button>
      //   </div>
      // </div>
    );
  }
};


