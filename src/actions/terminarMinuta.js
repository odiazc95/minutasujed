import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function TerminarMinuta(props) {
  const id = props.id;
  const [minutaData, setMinutaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/minutes/${id}`);
        setMinutaData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

    if (minutaData) {
      const datosMinuta = {
        ...minutaData,
        estatus: "Inactivo"
      };
      Swal.fire({
        title: 'Terminar Minuta',
        text: '¿Deseas Terminar la Minuta?',
        icon: 'question',
        confirmButtonText: 'Sí',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`http://localhost:3001/minutes/${id}`, datosMinuta)
            .then(response => {
              Swal.fire({
                title: 'Minuta Terminada',
                text: 'Se dio por Terminada correctamente la Minuta',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => window.location.reload());
            })
            .catch(error => {
              console.error('Error al guardar los datos:', error);
              Swal.fire({
                title: 'Error!',
                text: 'Error al terminar Minuta',
                icon: 'error',
                confirmButtonText: 'Cool'
              });
            });
        } else {
          Swal.fire({
            title: 'Minuta No Terminada',
            text: 'Se canceló el dar por terminada la Minuta',
            icon: 'info',
          });
        }
      });
    }


  return (
    <div>
    </div>
  );
}

export default TerminarMinuta;
