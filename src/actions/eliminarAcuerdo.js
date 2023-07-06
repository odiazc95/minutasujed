import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EliminarAcuerdo(props) {
  const id = props.id;

    Swal.fire({
      title: 'Eliminar Acuerdo',
      text: '¿Deseas Eliminar el Acuerdo?',
      icon: 'question',
      confirmButtonText: 'Sí',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/agreement/${id}`)
          .then(response => {
            console.log('Eliminación exitosa');
            Swal.fire({
              title: 'Acuerdo Eliminado',
              text: 'Se eliminó correctamente el Acuerdo',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(
              ()=> window.location.reload()
            )
          })
          .catch(error => {
            console.error('Error al eliminar:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error al eliminar el Acuerdo',
              icon: 'error',
              confirmButtonText: 'Cool',
            });
          });
      } else {
        Swal.fire({
          title: 'Acuerdo No Eliminado',
          text: 'No se ha Eliminado el Acuerdo',
          icon: 'info',
        });
      }
    });


  return (
    <div>
      
    </div>
  );
}

export default EliminarAcuerdo;
