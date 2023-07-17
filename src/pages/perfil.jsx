import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/perfil.css';
import Cookies from 'js-cookie';
import { Button, Card, Divider, Icon, Text, Title } from '@tremor/react';
import { BriefcaseIcon, BuildingOffice2Icon, LockClosedIcon, PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { EditProfileForm } from '../components/EditProfileForm';
import { EditPasswordForm } from '../components/EditPasswordForm';


const Perfil = () =>{
	const idU = Cookies.get('idUser');
	const [userData, setUserData] = useState(null);
	const [ isEditProfileFormOpen, setIsEditProfileFormOpen ] = useState(false);
    const [ isEditPasswordFormOpen, setIsEditPasswordFormOpen ] = useState(false);

  useEffect(() => {
    	fetchData();
  }, []);

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

    if(userData){
        return(
            <Card className='w-full h-full flex flex-col justify-between'>
                <div>
                    <div
                        className='w-full flex flex-col justify-center items-center'
                    >
                        <Icon 
                            icon={ UserCircleIcon }
                            size='xl'
                            variant='solid'
                            color='red'
                            tooltip='Nombre y correo del usuario'
                        />

                        <div className='w-full flex flex-col justify-center items-center'>
                            <Title>{ userData?.nombre } { userData?.apellido_paterno } { userData?.apellido_materno }</Title>
                            <Text>{ userData?.email }</Text>
                        </div>

                    </div>

                    <Divider />

					{
						isEditProfileFormOpen && !isEditPasswordFormOpen && (
							<EditProfileForm 
								userData={ userData } 
								setIsEditOpen={ setIsEditProfileFormOpen } 
								updateProfilePage={ fetchData }
								userId={ idU }
							/>
						)
					}

					{
						isEditPasswordFormOpen && !isEditProfileFormOpen && (
							<EditPasswordForm 
								setIsEditOpen={ setIsEditPasswordFormOpen } 
								updateProfilePage={ fetchData }
								userId={ idU }
							/>
						)
					}

					{
						!isEditProfileFormOpen && !isEditPasswordFormOpen && (
							<div className='w-full flex flex-col gap-3'>
								<div className='flex items-center gap-3'>
									<Icon 
										icon={ BriefcaseIcon }
										size='md'
										variant='solid'
										color='red'
										tooltip='Cargo del usuario'
									/>
									<div>
										<Title>Cargo:</Title>
										<Text>{ userData?.cargo }</Text>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<Icon
										icon={ BuildingOffice2Icon }
										size='md'
										variant='solid'
										color='red'
										tooltip='Area de trabajo del usuario'
									/>
									<div>
										<Title>Area:</Title>
										<Text>{ userData?.area }</Text>
									</div>
								</div>
							</div>
						)
					}

                </div>

				{
					!isEditProfileFormOpen && !isEditPasswordFormOpen && (
						<div className='w-full flex justify-center gap-3'>
							<Button
								variant='secondary'
								icon={ PencilSquareIcon }
								iconPosition='right'
								onClick={ () => setIsEditProfileFormOpen(true) }
							>
								Editar perfil
							</Button>

							<Button
								variant='secondary'
								icon={ LockClosedIcon }
								iconPosition='right'
								onClick={ () => setIsEditPasswordFormOpen(true) }
							>
								Cambiar contraseña
							</Button>
						</div>
					)
				}


            </Card>
            // <div className="contenedor">
            //     <div className="contenedor_perfil">

            //         <div className="parte_abajo_perfil">
            //             <div className="datos_perfil">
            //                 <div className="targeta_perfil">
            //                     <p className="inf-nombre inf_tex">Nombre</p>
            //                     <input className="datos_perfil_text" value={userData.nombre} type="text" placeholder="Nombre"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-ApellidoP inf_tex">Apellido Paterno</p>
            //                     <input className="datos_perfil_text" value={userData.apellido_paterno} type="text" placeholder="Apellido paterno"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-ApellidoM inf_tex">Apellido Materno</p>
            //                     <input className="datos_perfil_text" value={userData.apellido_materno} type="text" placeholder="Apellido Materno"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-cargo inf_tex">Cargo</p>
            //                     <input className="datos_perfil_text" value={userData.cargo} type="text" placeholder="Cargo"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-area inf_tex">Area</p>
            //                     <input className="datos_perfil_text" value={userData.area} type="text" placeholder="Area"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-email inf_tex">Email</p>
            //                     <input className="datos_perfil_text" value={userData.email} type="text" placeholder="Email"/>
            //                 </div>
            //                 <div className="targeta_perfil">
            //                     <p className="inf-contraseña inf_tex">Contraseña</p>
            //                     <input className="datos_perfil_text" type="text" placeholder="Contraseña"/>
            //                 </div>
            //             </div>
            //         </div>

            //         </div>
            //     </div>
    )
    }else{
        console.log("Error de usuario");
    }
    
}

export default Perfil;