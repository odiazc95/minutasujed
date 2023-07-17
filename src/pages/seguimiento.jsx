import React, { useState, useEffect } from "react";
import EditText from "../components/rich_text";
import "../assets/styles/seguimiento.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Icon, Subtitle, Tab, TabGroup, TabList, TextInput } from "@tremor/react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";


const NuevaMinutas = () => {
  const { idA } = useParams();
  const [acuerdoData, setAcuerdoData] = useState(null);
  const [formData, setFormData] = useState({
    asunto: "",
    responsablec_id: "",
    responsabler_id: "",
    acuerdo: "",
    fecha: "",
    descripcion: "",
    estatus: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/agreement/${idA}`);
        setAcuerdoData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idA]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.put(`http://localhost:3001/agreement/${idA}`, formData);
      if (response) {
        Swal.fire({
          title: 'Acuerdo Guardado',
          text: 'Se Guardo Correctamente el Acuerdo',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(
          // ()=>window.location.reload()
          navigate(-1)
        )
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo guardar el Seguimiento',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrio un Error al dar Seguimineto',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };

  if (acuerdoData) {
    console.log(acuerdoData.acuerdo);
    return (
      <>
        {/* <div className="cuestionario_seguimiento">
          <div className="seguimiento">
            <div className="arriba">
              <div>Atras</div>
            </div>
            <div className="parte_abajo_seguimiento">
              <h4 className="inf-gen">Acuerdo</h4>
              <input
                className="input_seguimiento"
                type="text"
                placeholder="Titulo del acuerdo"
                value={acuerdoData.acuerdo}
                readOnly
              />
              <h4 className="inf-gen">Estado</h4>
              <div className="radio">
                <div className="cont_radio_button">
                  <input
                    className="radio_button"
                    type="radio"
                    name="estatus"
                    id="terminado"
                    value="Terminado"
                    checked={formData.estatus === "Terminado"}
                    onChange={handleInputChange}
                  />
                  <label className="radio_label" htmlFor="terminado">
                    Terminado
                  </label>
                </div>
                <div className="cont_radio_button">
                  <input
                    className="radio_button"
                    type="radio"
                    name="estatus"
                    id="pendiente"
                    value="Pendiente"
                    checked={formData.estatus === "Pendiente"}
                    onChange={handleInputChange}
                  />
                  <label className="radio_label" htmlFor="pendiente">
                    Pendiente
                  </label>
                </div>
                <div className="cont_radio_button">
                  <input
                    className="radio_button"
                    type="radio"
                    name="estatus"
                    id="cancelado"
                    value="Cancelado"
                    checked={formData.estatus === "Cancelado"}
                    onChange={handleInputChange}
                  />
                  <label className="radio_label" htmlFor="cancelado">
                    Cancelado
                  </label>
                </div>
              </div>
              <input
                type="text"
                className="edit-text"
                name=""
                id=""
                value={acuerdoData.descripcion}
                readOnly
              />
              <input
                className="input_seguimiento"
                type="text"
                placeholder="Invitados"
              />
              <div className="cont-guardar">
                <button className="guardar" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <Icon className='w-10 h-10 cursor-pointer' 
          icon={ ArrowUturnLeftIcon } 
          onClick={ () => navigate(-1) } 
          variant='solid' 
          color='red'
          tooltip='Regresar'
        />

        <form className='w-full px-5 lg:px-40' onSubmit={handleSubmit}>

          <Subtitle className="mt-4">Acuerdo</Subtitle>
          <TextInput
            className='w-full mt-1'
            label='Acuerdo'
            name='acuerdo'
            placeholder='Acuerdo'
            value={acuerdoData.acuerdo}
            disabled
          />

          <Subtitle className="mt-2">Estado</Subtitle>
          <TabGroup
            onIndexChange={ (index) => {
              setFormData({ ...formData, estatus: index === 0 ? 'Terminado' : index === 1 ? 'Pendiente' : 'Cancelado' });
            }}
            index={ formData.estatus === 'Terminado' ? 0 : formData.estatus === 'Pendiente' ? 1 : 2 }
          >
            <TabList variant="solid">
              <Tab>Terminado</Tab>
              <Tab>Pendiente</Tab>
              <Tab>Cancelado</Tab>
            </TabList>
          </TabGroup>

          {/* <Subtitle className="mt-2">Descripción</Subtitle>
          <TextInput
            className='w-full mt-1'
            label='Descripción'
            name='descripcion'
            placeholder='Descripción'
            value={acuerdoData.descripcion}
            disabled
          /> */}

          {/* <Subtitle className="mt-2">Invitados</Subtitle>
          <TextInput
            className='w-full mt-1'
            label='Invitados'
            name='invitados'
            placeholder='Invitados'
            value={acuerdoData.invitados}
            disabled
          /> */}

          <Subtitle className="mt-2">Descripcion</Subtitle>
          {/* <textarea
              className='w-full mt-1 border-[1px] border-tremor-border rounded-tremor-default px-4 py-1 bg-white hover:bg-tremor-background-muted focus:ring-2 focus:ring-tremor-brand-muted focus:border-tremor-brand-subtle focus:outline-none
              shadow-tremor-input placeholder:text-tremor-content text-tremor-content-emphasis'
              label='Descripcion'
              name='descripcion'
              rows='7'
              placeholder='Descripcion'
              value={acuerdoData.descripcio}
              onChange={ handleInputChange }
            /> */}
          <EditText value={ acuerdoData.descripcion } setValue={ setFormData }/>

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
  }

  return null;
};

export default NuevaMinutas;
