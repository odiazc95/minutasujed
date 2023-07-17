import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditText from "../components/rich_text";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/styles/generarMinuta.css";

import { Title, Icon, Button, TextInput, Select, SelectItem, Subtitle } from "@tremor/react";

import { ArrowUturnLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const EditarMinuta = () => {
  const { idM } = useParams();
  const [usersData, setUserData] = useState([]);
  const [minutaData, setMinutaData] = useState(null);
  const [formData, setFormData] = useState({
    asunto: "",
    responsable: "",
    fecha: "",
    hora: "",
    tema: "",
    area: "",
    lugar: "",
    usuario_id: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/minutes/${idM}`);
        setMinutaData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idM]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/");
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    // try {
    //   const responsableEncontrado = usersData.find(
    //     (user) => user.nombre === formData.responsable
    //   );

    //   if (responsableEncontrado) {
    //     const response = await axios.put(`http://localhost:3001/minutes/${idM}`, {
    //       ...formData,
    //       responsable: responsableEncontrado._id
    //     });

    //     if (response) {
    //       Swal.fire({
    //         title: "Minuta Guardada",
    //         text: "Los datos se han guardado",
    //         icon: "success",
    //         confirmButtonText: "Cool"
    //       }).then(() => {
    //         // window.location.reload();
    //         navigate('/Dash/minutas')
    //       });
    //     }
    //   } else {
    //     Swal.fire({
    //       title: "Error!",
    //       text: "Responsable no encontrado",
    //       icon: "error",
    //       confirmButtonText: "Cool"
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Error al guardar los datos",
    //     icon: "error",
    //     confirmButtonText: "Cool"
    //   });
    // }
  };

  if (minutaData) {
    return (
      <>
        <Icon className='w-10 h-10 cursor-pointer' 
          icon={ ArrowUturnLeftIcon } 
          onClick={ () => navigate(-1) } 
          variant='solid' 
          color='red'
          tooltip='Regresar'
        />

      <form className='w-full px-5 lg:px-40' onSubmit={handleSubmit}>
        <Subtitle className="mt-2">Asunto</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Asunto'
          name='asunto'
          placeholder='Asunto'
          value={formData.asunto}
          onChange={handleInputChange}
        />

        <Subtitle className='mt-4'>Responsable</Subtitle>
        <Select
          className='w-full mt-1'
          name='responsable'
          value={formData.responsable}
          onValueChange={(value) => setFormData({ ...formData, responsable: value })}
        >
          {usersData.map((user) => (
            <SelectItem key={user._id} value={user.nombre}>
              {user.nombre}
            </SelectItem>
          ))}
        </Select>

        <div className='flex flex-col lg:flex-row gap-1'>
          <div className="w-full">
            <Subtitle className='mt-2'>Fecha</Subtitle>
            <TextInput
              className='w-full mt-1'
              label='Fecha'
              type="date"
              name='fecha'
              placeholder='Fecha'
              value={formData.fecha}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="w-full">
            <Subtitle className="mt-2">Hora</Subtitle>
            <TextInput
              className='w-full mt-1'
              label='Hora'
              type='time'
              name='hora'
              placeholder='Hora'
              value={formData.hora}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <Title className='mt-4'>Informacion general</Title>

        <Subtitle className="mt-2">Tema</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Tema'
          name='tema'
          placeholder='Tema'
          value={formData.tema}
          onChange={handleInputChange}
        />

        <Subtitle className="mt-2">Area</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Area'
          name='area'
          placeholder='Area'
          value={formData.area}
          onChange={handleInputChange}
        />

        <Subtitle className="mt-2">Lugar</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Lugar'
          name='lugar'
          placeholder='Lugar'
          value={formData.lugar}
          onChange={handleInputChange}
        />

        <Subtitle className="mt-2">Descripcion</Subtitle>
        {/* <textarea
          className='w-full mt-1 border-[1px] border-tremor-border rounded-tremor-default px-4 py-1 bg-white hover:bg-tremor-background-muted focus:ring-2 focus:ring-tremor-brand-muted focus:border-tremor-brand-subtle focus:outline-none
          shadow-tremor-input placeholder:text-tremor-content text-tremor-content-emphasis'
          label='Descripcion'
          name='descripcion'
          rows='7'
          placeholder='Descripcion'
          value={formData.descripcion}
          onChange={handleInputChange}
        /> */}
        <EditText value={ formData.descripcion } setValue={ setFormData } />

        <Subtitle className="mt-2">Invitados</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Invitados'
          name='usuario_id'
          placeholder='Invitados'
          value={formData.invitados}
          onChange={handleInputChange}
        />

        
        <Button
          className='w-full mt-4'
          type='submit'
          color='green'
          icon={ PaperAirplaneIcon }
          iconPosition='right'
        >
          Guardar
        </Button>
      </form>
      </>
    );
  } else {
    return null; // Si no hay datos de la minuta, puedes mostrar un estado de carga o redirigir a otra página
  };
};

export default EditarMinuta;