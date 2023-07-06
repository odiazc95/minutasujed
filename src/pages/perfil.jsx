import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/perfil.css';
import Cookies from 'js-cookie';


const Perfil = () =>{
  const idU = Cookies.get('idUser');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${idU}`);
        setUserData(response.data); 
        console.log("aaaaaaaaaaaaaaaaaaaaaaa");
        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
    if(userData){
        return(
            <div className="contenedor">
                <div className="contenedor_perfil">

                    <div className="parte_abajo_perfil">
                        <div className="datos_perfil">
                            <div className="targeta_perfil">
                                <p className="inf-nombre inf_tex">Nombre</p>
                                <input className="datos_perfil_text" value={userData.nombre} type="text" placeholder="Nombre"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-ApellidoP inf_tex">Apellido Paterno</p>
                                <input className="datos_perfil_text" value={userData.apellido_paterno} type="text" placeholder="Apellido paterno"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-ApellidoM inf_tex">Apellido Materno</p>
                                <input className="datos_perfil_text" value={userData.apellido_materno} type="text" placeholder="Apellido Materno"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-cargo inf_tex">Cargo</p>
                                <input className="datos_perfil_text" value={userData.cargo} type="text" placeholder="Cargo"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-area inf_tex">Area</p>
                                <input className="datos_perfil_text" value={userData.area} type="text" placeholder="Area"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-email inf_tex">Email</p>
                                <input className="datos_perfil_text" value={userData.email} type="text" placeholder="Email"/>
                            </div>
                            <div className="targeta_perfil">
                                <p className="inf-contraseña inf_tex">Contraseña</p>
                                <input className="datos_perfil_text" type="text" placeholder="Contraseña"/>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
    )
    }else{
        console.log("Error de usuario");
    }
    
}

export default Perfil;