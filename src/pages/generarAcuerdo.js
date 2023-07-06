import React, { useState, useEffect } from "react";
import axios from "axios";
import EditText from "../components/rich_text";
import "../assets/styles/generarAcuerdo.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleGuardarClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/agreement/",
        formData
      );
      console.log("Datos guardados exitosamente: ", response);
      Swal.fire({
        title: "Acuerdo Creado",
        text: "Se creó correctamente el Acuerdo",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(() => {
        window.location.href = `/minutas/${idA}`;
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
    <div className="contenedor">
      <div className="generaracuerdo">
        <div className="arriba">
          <div>Atras</div>
        </div>
        <div className="parte_abajo_acuerdo">
          <h4 className="inf-gen">Datos del acuerdo</h4>
          <select
            className="input_acuerdo"
            value={formData.responsablec_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                responsablec_id: e.target.value,
              })
            }
          >
            <option value="">Responsable a cumplir</option>
            {responsables.map((responsable) => (
              <option key={responsable._id} value={responsable._id}>
                {responsable.nombre}
              </option>
            ))}
          </select>

          <select
            className="input_acuerdo"
            value={formData.responsabler_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                responsabler_id: e.target.value,
              })
            }
          >
            <option value="">Responsable a revisión</option>
            {responsables.map((responsable) => (
              <option key={responsable._id} value={responsable._id}>
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
              value={formData.acuerdo}
              onChange={(e) =>
                setFormData({ ...formData, acuerdo: e.target.value })
              }
            />
            <input
              className="fecha input_acuerdo"
              type="text"
              placeholder="Fecha de compromiso (DD-MM-YY)"
              value={formData.fecha}
              onChange={(e) =>
                setFormData({ ...formData, fecha: e.target.value })
              }
            />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Descripción"
              className="edit-text"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
            />
          </div>
          <div className="cont-guardar">
            <button className="guardar" onClick={handleGuardarClick}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoAcuerdo;
