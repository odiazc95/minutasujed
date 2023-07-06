import React, { useState, useEffect } from "react";
import axios from "axios";
import EditText from "../components/rich_text";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/styles/generarMinuta.css";

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
    usuario_id: []
  });

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
    try {
      const responsableEncontrado = usersData.find(
        (user) => user.nombre === formData.responsable
      );

      if (responsableEncontrado) {
        const response = await axios.put(`http://localhost:3001/minutes/${idM}`, {
          ...formData,
          responsable: responsableEncontrado._id
        });

        if (response) {
          Swal.fire({
            title: "Minuta Guardada",
            text: "Los datos se han guardado",
            icon: "success",
            confirmButtonText: "Cool"
          }).then(() => {
            window.location.reload();
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Responsable no encontrado",
          icon: "error",
          confirmButtonText: "Cool"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Error al guardar los datos",
        icon: "error",
        confirmButtonText: "Cool"
      });
    }
  };

  if (minutaData) {
    return (
      <div className="cuestionario_minuta">
        <div className="generarminuta">
          <div className="arriba">
            <div>Atras</div>
          </div>
          <div className="parte_abajo_minuta">
            <form onSubmit={handleSubmit}>
              <input
                className="input_minuta"
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleInputChange}
              />
              <select
                className="input_minuta"
                name="responsable"
                value={formData.responsable}
                onChange={handleInputChange}
              >
                {usersData.map((user) => (
                  <option key={user._id} value={user.nombre}>
                    {user.nombre}
                  </option>
                ))}
              </select>
              <div className="hora_fecha">
                <input
                  className="fecha input_minuta"
                  type="text"
                  name="fecha"
                  placeholder="Fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
                <input
                  className="hora input_minuta"
                  type="text"
                  name="hora"
                  placeholder="Hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                />
              </div>
              <h4 className="inf-gen">Informacion general</h4>
              <input
                className="input_minuta"
                type="text"
                name="tema"
                placeholder="Tema"
                value={formData.tema}
                onChange={handleInputChange}
              />
              <input
                className="input_minuta"
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleInputChange}
              />
              <input
                className="input_minuta"
                type="text"
                name="lugar"
                placeholder="Lugar"
                value={formData.lugar}
                onChange={handleInputChange}
              />
              {/* <EditText className="edit-text" /> */}
              <input
                className="input_minuta"
                type="text"
                name="invitados"
                placeholder="Invitados"
                value={formData.invitados}
                onChange={handleInputChange}
              />
              <div className="cont-guardar">
                <button className="guardar" type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null; // Si no hay datos de la minuta, puedes mostrar un estado de carga o redirigir a otra página
  }
};

export default EditarMinuta;
