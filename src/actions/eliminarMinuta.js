import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EliminarMinuta(props) {
  const id = props.id;

  Swal.fire({
    title: 'Eliminar Minuta',
    text: '¿Deseas Eliminar la Minuta?',
    icon: 'question',
    confirmButtonText: 'Sí',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3001/minutes/${id}`)
        .then(response => {
          console.log('Eliminación exitosa');
          Swal.fire({
            title: 'Minuta Eliminado',
            text: 'Se eliminó correctamente la Minuta',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        })
        .catch(error => {
          console.error('Error al eliminar:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error al eliminar la Minuta',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        });
    } else {
      Swal.fire({
        title: 'Minuta No Eliminada',
        text: 'No se ha Eliminado la Minuta',
        icon: 'info',
      });
    }
  });

  return (
    <div>
     
    </div>
  );
}

export default EliminarMinuta;
