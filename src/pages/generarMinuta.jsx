import React, { useState, useEffect } from "react";
import axios from "axios";
import EditText from "../components/rich_text";
import "../assets/styles/generarMinuta.css";
import Swal from "sweetalert2";

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
    usuario_id: [],
    descripcion: "",
    estatus: "Activo"
  });

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

  const handleChange = (e) => {
    setDatosMinuta({
      ...datosMinuta,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const responsableEncontrado = usersData.find(
      (user) => user.nombre === datosMinuta.responsable
    );

    if (responsableEncontrado) {
      axios
        .post("http://localhost:3001/minutes/", {
          ...datosMinuta,
          responsable: responsableEncontrado._id
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Minuta Guardada",
            icon: "success",
            confirmButtonText: "Cool"
          }).then(() => {
            window.location.href='/minutas';
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
    } else {
      Swal.fire({
        title: "Error!",
        text: "Responsable no encontrado",
        icon: "error",
        confirmButtonText: "Cool"
      });
    }
  };

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
              value={datosMinuta.asunto}
              onChange={handleChange}
            />
            <input
              className="input_minuta"
              type="text"
              name="responsable"
              placeholder="Responsable"
              value={datosMinuta.responsable}
              onChange={handleChange}
            />
            <div className="hora_fecha">
              <input
                className="fecha input_minuta"
                type="text"
                name="fecha"
                placeholder="Fecha"
                value={datosMinuta.fecha}
                onChange={handleChange}
              />
              <input
                className="hora input_minuta"
                type="text"
                name="hora"
                placeholder="Hora"
                value={datosMinuta.hora}
                onChange={handleChange}
              />
            </div>
            <h4 className="inf-gen">Informacion general</h4>
            <input
              className="input_minuta"
              type="text"
              name="tema"
              placeholder="Tema"
              value={datosMinuta.tema}
              onChange={handleChange}
            />
            <input
              className="input_minuta"
              type="text"
              name="area"
              placeholder="Area"
              value={datosMinuta.area}
              onChange={handleChange}
            />
            <input
              className="input_minuta"
              type="text"
              name="lugar"
              placeholder="Lugar"
              value={datosMinuta.lugar}
              onChange={handleChange}
            />
            {/* <EditText className="edit-text" /> */}
            <input
              className="input_minuta"
              type="text"
              name="descripcion"
              placeholder="Descripcion"
              value={datosMinuta.descripcion}
              onChange={handleChange}
            />
            <input
              className="input_minuta"
              type="text"
              name="invitados"
              placeholder="Invitados"
              value={datosMinuta.usuario_id}
              onChange={handleChange}
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
};

export default NuevaMinutas;
