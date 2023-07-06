import React, { useState, useEffect } from "react";
import EditText from "../components/rich_text";
import "../assets/styles/seguimiento.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


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
    try {
      const response = await axios.put(`http://localhost:3001/agreement/${idA}`, formData);
      if (response) {
        Swal.fire({
          title: 'Acuerdo Guardado',
          text: 'Se Guardo Correctamente el Acuerdo',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(
          ()=>window.location.reload()
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
      <div className="cuestionario_seguimiento">
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
      </div>
    );
  }

  return null;
};

export default NuevaMinutas;
