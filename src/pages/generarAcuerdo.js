import React, { useState, useEffect } from "react";
import axios from "axios";
import EditText from "../components/rich_text";
import "../assets/styles/generarAcuerdo.css";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Title, Icon, Button, SearchSelect, SearchSelectItem, TextInput, Subtitle } from "@tremor/react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const NuevoAcuerdo = () => {
  const { idA } = useParams();
  const [responsables, setResponsables] = useState([]);
  const [formData, setFormData] = useState({
    minuta_id:idA,
    responsablec_id: "",
    responsabler_id: "",
    acuerdo: "",
    fecha: "",
    descripcion: "",
    estatus: "Pendiente",
    reporte_estado:"En revision"
  });
  const [ editableDescription, setEditableDescription ] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/");
        setResponsables(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResponsables();
  }, []);

  const handleGuardarClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/agreement/", {
          ...formData,
          descripcion: editableDescription
        }
      );
      console.log("Datos guardados exitosamente: ", response);
      Swal.fire({
        title: "Acuerdo Creado",
        text: "Se creó correctamente el Acuerdo",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(() => {
        navigate(`/Dash/minutas/${idA}`);
      });
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      Swal.fire({
        title: "Error!",
        text: "Error al guardar los datos",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    // <div className="contenedor">
    //   <div className="generaracuerdo">
    //     <div className="arriba">
    //       <div>Atras</div>
    //     </div>
    //     <div className="parte_abajo_acuerdo">
    //       <h4 className="inf-gen">Datos del acuerdo</h4>
    //       <select
    //         className="input_acuerdo"
    //         value={formData.responsablec_id}
    //         onChange={(e) =>
    //           setFormData({
    //             ...formData,
    //             responsablec_id: e.target.value,
    //           })
    //         }
    //       >
    //         <option value="">Responsable a cumplir</option>
    //         {responsables.map((responsable) => (
    //           <option key={responsable._id} value={responsable._id}>
    //             {responsable.nombre}
    //           </option>
    //         ))}
    //       </select>

    //       <select
    //         className="input_acuerdo"
    //         value={formData.responsabler_id}
    //         onChange={(e) =>
    //           setFormData({
    //             ...formData,
    //             responsabler_id: e.target.value,
    //           })
    //         }
    //       >
    //         <option value="">Responsable a revisión</option>
    //         {responsables.map((responsable) => (
    //           <option key={responsable._id} value={responsable._id}>
    //             {responsable.nombre}
    //           </option>
    //         ))}
    //       </select>

    //       <h4 className="inf-gen">Información general</h4>
    //       <div className="titulo_fecha">
    //         <input
    //           className="titulo input_acuerdo"
    //           type="text"
    //           placeholder="Título"
    //           value={formData.acuerdo}
    //           onChange={(e) =>
    //             setFormData({ ...formData, acuerdo: e.target.value })
    //           }
    //         />
    //         <input
    //           className="fecha input_acuerdo"
    //           type="text"
    //           placeholder="Fecha de compromiso (DD-MM-YY)"
    //           value={formData.fecha}
    //           onChange={(e) =>
    //             setFormData({ ...formData, fecha: e.target.value })
    //           }
    //         />
    //       </div>
    //       <div className="">
    //         <input
    //           type="text"
    //           placeholder="Descripción"
    //           className="edit-text"
    //           value={formData.descripcion}
    //           onChange={(e) =>
    //             setFormData({ ...formData, descripcion: e.target.value })
    //           }
    //         />
    //       </div>
    //       <div className="cont-guardar">
    //         <button className="guardar" onClick={handleGuardarClick}>
    //           Guardar
    //         </button>
    //       </div>
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

        <form className='w-full px-5 lg:px-40' onSubmit={(e) => handleGuardarClick(e)}>

          <Title className='mt-4'>Datos del acuerdo</Title>
          <Subtitle className='mt-2'>Responsable a cumplir</Subtitle>
          <SearchSelect
            className='mt-1'
            value={formData.responsablec_id}
            onValueChange={(value) => setFormData({ ...formData, responsablec_id: value })}
          >
            {responsables.map((responsable) => (
              <SearchSelectItem key={responsable._id} value={responsable._id}>
                {responsable.nombre}
              </SearchSelectItem>
            ))}
          </SearchSelect>
          
          <Subtitle className='mt-2'>Responsable a revisión</Subtitle>
          <SearchSelect
            className='mt-1'
            value={formData.responsabler_id}
            onValueChange={(value) => setFormData({ ...formData, responsabler_id: value })}
          >
            {responsables.map((responsable) => (
              <SearchSelectItem key={responsable._id} value={responsable._id}>
                {responsable.nombre}
              </SearchSelectItem>
            ))}
          </SearchSelect>

          <Title className='mt-4'>Información general</Title>
          <div className='flex flex-wrap md:flex-nowrap gap-4'>
            <div className="w-full">
              <Subtitle className="mt-2">Titluo</Subtitle>
              <TextInput
                className='mt-1'
                placeholder='Título'
                value={formData.acuerdo}
                onChange={(e) =>
                  setFormData({ ...formData, acuerdo: e.target.value })
                }
              />
            </div>
            
            <div className="w-full">
              <Subtitle className="mt-2">Fecha de compromiso</Subtitle>
              <TextInput
                className='mt-1'
                placeholder='Fecha de compromiso (DD-MM-YY)'
                value={formData.fecha}
                type='date'
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
              />
            </div>

            {/* <TextInput
              className='mt-1'
              placeholder='Descripción'
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
            /> */}
          </div>
          <Subtitle className="mt-2">Descripción</Subtitle>
          <EditText value={ editableDescription } setValue={ setEditableDescription } />

          <Button
            className='mt-4 w-full'
            type='submit'
            icon={ PaperAirplaneIcon }
            iconPosition='right'
            color='green'
          >
            Guardar
          </Button>

        </form>
    </>
  );
};

export default NuevoAcuerdo;