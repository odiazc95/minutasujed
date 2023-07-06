import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/usuarios.css'
import TargetaUsuario from '../components/Usuarios'

const Usuarios = () => {
  const [usersData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/');
        setUserData(response.data); 

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const areas = [
    'Facultad de Ciencias Quimicas Durango',
    'Vinculacion Facultad de Ciencias Forestales y Ambientales',
    'Facultad de Ciencias Forestales y Ambientales',
    'Facultad de Ciencias Quimicas',
    'CCH',
    'Secretaria Tecnica',
    'Red de Investigacion',
    'Facultad de Medicina y Nutricion',
    'Facultad de Trabajo Social',
    'Difusion Cultural',
    'No Especificado'
  ];

  if (usersData) {
    return (
      <div className="contenedor">
        <div className="contenedor_usuarios">
          <div className="abajo_usuarios">
            {areas.map((area) => (
              <React.Fragment key={area}>
                <div className="area_usuarios">
                  <p>{area}</p>
                </div>
                <div className="contUsuarios">
                  {usersData
                    .filter((user) => user.area === area)
                    .map((user) => (
                      <TargetaUsuario key={user.email} User={user} />
                    ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Usuarios;


