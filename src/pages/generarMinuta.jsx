import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditText from "../components/rich_text";
import "../assets/styles/generarMinuta.css";
import Swal from "sweetalert2";
import { Title, Icon, Button, TextInput, Subtitle, SearchSelect, SearchSelectItem, MultiSelect, MultiSelectItem } from "@tremor/react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const NuevaMinutas = () => {
  const [usersData, setUserData] = useState([]);
  const [datosMinuta, setDatosMinuta] = useState({
    asunto: "",
    responsable: "",
    fecha: "",
    hora: "",
    tema: "",
    area: "",
    lugar: "",
    usuario_id: '',
    descripcion: "",
    estatus: "Activo"
  });
  const [ guests, setGuests ] = useState([])
  const [ editableDescription, setEditableDescription ] = useState('');

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(guests)
    console.log(guests.join(','))
  }, [guests])

  const handleChange = (e) => {
    setDatosMinuta({
      ...datosMinuta,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosMinuta);
    // const responsableEncontrado = usersData.find(
    //   (user) => user.nombre === datosMinuta.responsable
    // );
    
    // if (responsableEncontrado) {
      axios
        .post("http://localhost:3001/minutes/", {
          ...datosMinuta,
          descripcion: editableDescription,
          usuario_id: guests
          // responsable: responsableEncontrado._id
        })
        .then((response) => {
          console.log(response.data)
          console.log(response)
          Swal.fire({
            title: "Minuta Guardada",
            icon: "success",
            confirmButtonText: "Cool"
          }).then(() => {
            // window.location.href='/minutas';
            navigate("/Dash/minutas")
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Error al guardar los datos",
            icon: "error",
            confirmButtonText: "Cool"
          });
        });
    // } else {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Responsable no encontrado",
    //     icon: "error",
    //     confirmButtonText: "Cool"
    //   });
    // }
  };

  return (
    // <div className="cuestionario_minuta">
    //   <div className="generarminuta">
    //     <div className="arriba">
    //       <div>Atras</div>
    //     </div>
    //     <div className="parte_abajo_minuta">
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="asunto"
    //           placeholder="Asunto"
    //           value={datosMinuta.asunto}
    //           onChange={handleChange}
    //         />
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="responsable"
    //           placeholder="Responsable"
    //           value={datosMinuta.responsable}
    //           onChange={handleChange}
    //         />
    //         <div className="hora_fecha">
    //           <input
    //             className="fecha input_minuta"
    //             type="text"
    //             name="fecha"
    //             placeholder="Fecha"
    //             value={datosMinuta.fecha}
    //             onChange={handleChange}
    //           />
    //           <input
    //             className="hora input_minuta"
    //             type="text"
    //             name="hora"
    //             placeholder="Hora"
    //             value={datosMinuta.hora}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <h4 className="inf-gen">Informacion general</h4>
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="tema"
    //           placeholder="Tema"
    //           value={datosMinuta.tema}
    //           onChange={handleChange}
    //         />
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="area"
    //           placeholder="Area"
    //           value={datosMinuta.area}
    //           onChange={handleChange}
    //         />
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="lugar"
    //           placeholder="Lugar"
    //           value={datosMinuta.lugar}
    //           onChange={handleChange}
    //         />
    //         {/* <EditText className="edit-text" /> */}
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="descripcion"
    //           placeholder="Descripcion"
    //           value={datosMinuta.descripcion}
    //           onChange={handleChange}
    //         />
    //         <input
    //           className="input_minuta"
    //           type="text"
    //           name="invitados"
    //           placeholder="Invitados"
    //           value={datosMinuta.usuario_id}
    //           onChange={handleChange}
    //         />
    //         <div className="cont-guardar">
    //           <button className="guardar" type="submit">
    //             Guardar
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
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
          value={datosMinuta.asunto}
          onChange={handleChange}
        />

        <Subtitle className="mt-2">Responsable</Subtitle>
        <SearchSelect
          className='w-full mt-1'
          name='responsable'
          value={datosMinuta.responsable}
          onValueChange={(value) => setDatosMinuta({ ...datosMinuta, responsable: value })}
        >
          {/* <SearchSelectItem value=''>Selecciona un usuario</SearchSelectItem> */}
          {usersData.map((user) => (
            <SearchSelectItem key={user._id} value={user._id}>
              {user.nombre}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        {/* <TextInput
          className='w-full mt-1'
          label='Responsable'
          name='responsable'
          placeholder='Responsable'
          value={datosMinuta.responsable}
          onChange={handleChange}
        /> */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <Subtitle className="mt-2">Fecha</Subtitle>
            <TextInput
              className='w-full mt-1'
              label='Fecha'
              name='fecha'
              type='date'
              placeholder='Fecha'
              value={datosMinuta.fecha}
              onChange={handleChange}
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
              value={datosMinuta.hora}
              onChange={handleChange}
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
          value={datosMinuta.tema}
          onChange={handleChange}
        />

        <Subtitle className="mt-2">Area</Subtitle>
        <TextInput
          className='w-full mt-1'
          label='Area'
          name='area'
          placeholder='Area'
          value={datosMinuta.area}
          onChange={handleChange}
        />

        <Subtitle className="mt-2">Lugar</Subtitle>
        <TextInput
          className='w-full mt-1 mb-1'
          label='Lugar'
          name='lugar'
          placeholder='Lugar'
          value={datosMinuta.lugar}
          onChange={handleChange}
        />
        {/* <textarea
          className='w-full mt-1 border-[1px] border-tremor-border rounded-tremor-default px-4 py-1 bg-white hover:bg-tremor-background-muted focus:ring-2 focus:ring-tremor-brand-muted focus:border-tremor-brand-subtle focus:outline-none
          shadow-tremor-input placeholder:text-tremor-content text-tremor-content-emphasis'
          label='Descripcion'
          name='descripcion'
          rows='7'
          placeholder='Descripcion'
          value={datosMinuta.descripcion}
          onChange={handleChange}
        /> */}
        <Subtitle className="mt-2">Invitados</Subtitle>
        <MultiSelect
          className='w-full mt-1'
          name='usuario_id'
          value={guests}
          onValueChange={(value) => setGuests(value)}
        >
          {/* <SearchSelectItem value=''>Selecciona un usuario</SearchSelectItem> */}
          {usersData.map((user) => (
            <MultiSelectItem key={user._id} value={user._id}>
              {user.nombre}
            </MultiSelectItem>
          ))}
        </MultiSelect>

        <Subtitle className="mt-2">Descripcion</Subtitle>
        <EditText value={ editableDescription } setValue={ setEditableDescription } />


        {/* <TextInput
          className='w-full mt-1'
          label='Invitados'
          name='usuario_id'
          placeholder='Invitados'
          value={datosMinuta.usuario_id}
          onChange={handleChange}
        /> */}


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
};

export default NuevaMinutas;
