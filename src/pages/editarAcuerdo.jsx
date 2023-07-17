import React, { useState, useEffect } from "react";
import axios from "axios";
import EditText from "../components/rich_text";
import "../assets/styles/generarAcuerdo.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Icon, Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const EditarAcuerdo = () => {
  const { idA } = useParams();
  const [responsables, setResponsables] = useState([]);
  const [acuerdoData, setAcuerdoData] = useState(null);
  const [formData, setFormData] = useState({
    asunto: "",
    responsablec_id: "",
    responsabler_id: "",
    acuerdo: "",
    fecha: "",
    descripcion: ""
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

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/`);
        setResponsables(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResponsables();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responsableCumplir = responsables.find(
        (user) => user.nombre === formData.responsablec_id
      );
      const responsableRevision = responsables.find(
        (user) => user.nombre === formData.responsabler_id
      );
      if (responsableCumplir && responsableRevision) {
        const response = await axios.put(`http://localhost:3001/agreement/${idA}`, {
          ...formData,
          responsablec_id: responsableCumplir._id,
          responsabler_id: responsableRevision._id
        });
        if (response) {
          Swal.fire({
            title: 'Acuerdo Guardado',
            text: 'Los datos se han guardado',
            icon: 'success',
            confirmButtonText: 'Cool',
          }).then(() => {
            // window.location.reload();
            navigate(-1)
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Responsable no encontrado',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Error al guardar los datos',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };
  

  if (acuerdoData) {
    return (
      <>
        {/* <div className="contenedor">
          <div className="generaracuerdo">
            <div className="arriba">
              <div>Atras</div>
            </div>
            <div className="parte_abajo_acuerdo">
              <h4 className="inf-gen">Datos del acuerdo</h4>
              <select
                className="input_acuerdo"
                name="responsablec_id"
                value={formData.responsablec_id}
                onChange={handleInputChange}
              >
                <option value="">Responsable a cumplir</option>
                {responsables.map((responsable) => (
                  <option key={responsable._id} value={responsable.nombre}>
                    {responsable.nombre}
                  </option>
                ))}
              </select>
              <select
                className="input_acuerdo"
                name="responsabler_id"
                value={formData.responsabler_id}
                onChange={handleInputChange}
              >
                <option value="">Responsable a revisión</option>
                {responsables.map((responsable) => (
                  <option key={responsable._id} value={responsable.nombre}>
                    {responsable.nombre}
                  </option>
                ))}
              </select>
              <h4 className="inf-gen">Información general</h4>
              <div className="titulo_fecha">
                <input
                  className="titulo input_acuerdo"
                  type="text"
                  placeholder="Título"
                  name="acuerdo"
                  value={formData.acuerdo}
                  onChange={handleInputChange}
                />
                <input
                  className="fecha input_acuerdo"
                  type="text"
                  placeholder="Fecha de compromiso (DD-MM-YY)"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>
              <div className=""> */}
                {/* <EditText
                  className="edit-text"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  name="descripcion"
                /> */}
                {/* <input type="text" name="descripcion" onChange={handleInputChange} className="edit-text" value={formData.descripcion} />
              </div>
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
          <Title className='mt-4'>Datos del acuerdo</Title>

          <Subtitle className="mt-2">Responsable a cumplir</Subtitle>
          <Select
            value={formData.responsablec_id}
            onValueChange={(value) => setFormData({ ...formData, responsablec_id: value })}
          >
            {responsables.map((responsable) => (
              <SelectItem key={responsable._id} value={responsable.nombre}>
                {responsable.nombre}
              </SelectItem>
            ))}
          </Select>

          <Subtitle className="mt-2">Responsable a revisión</Subtitle>
          <Select
            value={formData.responsabler_id}
            onValueChange={(value) => setFormData({ ...formData, responsabler_id: value })}
          >
            {responsables.map((responsable) => (
              <SelectItem key={responsable._id} value={responsable.nombre}>
                {responsable.nombre}
              </SelectItem>
            ))}
          </Select>

          <Title className="mt-5">Información general</Title>
          <Subtitle className="mt-2">Título</Subtitle>
          <TextInput
            className='w-full mt-1'
            label='Título'
            name='acuerdo'
            placeholder='Título'
            value={formData.acuerdo}
            onChange={handleInputChange}
          />
          <Subtitle className="mt-2">Fecha de compromiso</Subtitle>
          <TextInput
            className='w-full mt-1'
            label='Fecha de compromiso'
            name='fecha'
            type='date'
            placeholder='Fecha de compromiso'
            value={formData.fecha}
            onChange={handleInputChange}
          />
          <Subtitle className="mt-2">Descripción</Subtitle>
          {/* <TextInput
            className='w-full mt-1'
            label='Descripción'
            name='descripcion'
            placeholder='Descripción'
            value={formData.descripcion}
            onChange={handleInputChange}
          /> */}
          <EditText value={ formData.descripcion }  setValue={ setFormData }/>

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

export default EditarAcuerdo;
