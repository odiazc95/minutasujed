import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
// import '../assets/styles/estilos_login.css';
import logo_UJED from '../assets/img/logoujed.png';
// import { HiUser } from 'react-icons/hi';
// import { BsFillKeyFill } from 'react-icons/bs';
import { AuthContext } from "../components/AuthContext";
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { Button, TextInput, Title, Text } from "@tremor/react";
import { LockClosedIcon, AtSymbolIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((users) => {
        const user = users.find((user) => user.email === email);
        console.log(user);

        if (user) {
          console.log('Puede');
          bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
              console.log('Naa');
              if (passwordMatch) {
                console.log("Inicio de sesión exitoso");
                Cookies.set("idUser", user._id, { path: "/" });
                // window.location.href = "/inicio";
                navigate('/inicio');
              } else {
                console.log("Credenciales inválidas");
              }
            })
            .catch((error) => {
              console.error('Error al comparar contraseñas:', error);
            });
        } else {
          console.log('Usuario no encontrado');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
      navigate('/Dash/inicio');
  };

  return (
    // <div className="container-sides">
    //   <div className="left-side">
    //     <img src={logo_UJED} alt="Logo" />
    //     <h1>Sistema de gestión de minutas</h1>
    //   </div>
    //   <div className="right-side">
    //     <form onSubmit={handleSubmit}>
    //       <div className="input-log">
    //         <HiUser color="B11830" size={20} />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Correo electrónico"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>
    //       <div className="input-log">
    //         <BsFillKeyFill color="B11830" size={20} />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Contraseña"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button type="submit">Iniciar sesión</button>
    //     </form>
    //     <button type="button">¿Olvidaste tu contraseña?</button>
    //   </div>
    // </div>
    <>
      <main className='w-full h-screen flex'>

        <aside className='bg-main hidden w-1/2 h-screen md:flex flex-col justify-center items-center'>
          <img src={logo_UJED} alt="ujed logo" className='rounded-full' />
          <Title className='text-white'>Sistema de gestión de minutas</Title>
        </aside>

        <aside className='w-full md:w-1/2 h-screen flex flex-col justify-center items-center'>

          <div className='-mt-20 md:hidden'>
            <img src={logo_UJED} alt="ujed logo" className='bg-main rounded-full w-40 h-40' />
          </div>

          <form className='w-3/4 flex flex-col gap-3 mt-5 md:mt-0' onSubmit={handleSubmit}>
            <TextInput
              type='email'
              name='email'
              placeholder='Correo electrónico'
              icon={ AtSymbolIcon }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              type='password'
              name='password'
              placeholder='Contraseña'
              icon={ LockClosedIcon }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className='mt-4'
              type='submit' 
              onClick={handleSubmit}
              color='red'
              variant='secondary'
              icon={ PaperAirplaneIcon }
              iconPosition='right'
            >
              Iniciar sesión
            </Button>
            
            <Text className='text-center'>
              ¿Olvidaste tu contraseña?
            </Text>
          </form>
        </aside>

      </main>
    </>
  );
}

export default Login;
