import '../assets/styles/estilos_login.css';
import logo_UJED from '../assets/img/logoujed.png';
import { HiUser } from 'react-icons/hi';
import { BsFillKeyFill } from 'react-icons/bs';
import React, { useState,useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
                window.location.href = "/inicio";
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
  };

  return (
    <div className="container-sides">
      <div className="left-side">
        <img src={logo_UJED} alt="Logo" />
        <h1>Sistema de gestión de minutas</h1>
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit}>
          <div className="input-log">
            <HiUser color="B11830" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-log">
            <BsFillKeyFill color="B11830" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <button type="button">¿Olvidaste tu contraseña?</button>
      </div>
    </div>
  );
}

export default Login;
