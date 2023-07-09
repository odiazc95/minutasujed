import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../assets/styles/lat-bar.css";
// import { AiFillHome, AiFillFileText } from "react-icons/ai";
// import { BsFillPersonFill } from "react-icons/bs";
// import { FaUsers, FaDoorClosed } from "react-icons/fa";
import imge1 from '../assets/img/logoujedblanco.png'
import { Metric, Text, Icon } from "@tremor/react";
import { HomeIcon, DocumentIcon, UserIcon, UserGroupIcon, ArrowLeftOnRectangleIcon, Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';

const ROUTES = [
  { label: 'Inicio', path: '/Dash/inicio', icon: HomeIcon },
  { label: 'Minutas', path: '/Dash/minutas', icon: DocumentIcon },
  { label: 'Perfil', path: '/Dash/perfil', icon: UserIcon },
  { label: 'Usuarios', path: '/Dash/usuarios', icon: UserGroupIcon },
]

function LatBar({ children }) {

  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    const cookies = Cookies.get();
    // Iterar sobre todas las cookies y eliminarlas una por una
    Object.keys(cookies).forEach(cookie => {
      Cookies.remove(cookie);
    });
    
    // Redirigir a la página de inicio
    navigate('/Login');
    
  }

  return (
    // <nav className="lat-cointainer">
    //   <div className="top-bar">
    //         <img className="logo" src={imge1} alt='logo Ujed'/>
    //         <h2 className="titulo">Gestion de Minutas</h2>
    //     </div>
    //   <div className="lat-bar">
    //     <div className="nav_principal">
    //       <div className="nav">
    //         <Link to="/inicio" className="link">
    //           <AiFillHome className="iconoLatBar" />
    //           Inicio
    //         </Link>
    //       </div>
    //       <div className="nav">
    //         <Link to="/minutas" className="link">
    //           <AiFillFileText className="iconoLatBar" />
    //           Minutas
    //         </Link>
    //       </div>
    //       <div className="nav">
    //         <Link to="/perfil" className="link">
    //           <BsFillPersonFill className="iconoLatBar" />
    //           Perfil
    //         </Link>
    //       </div>
    //       <div className="nav">
    //         <Link to="/usuarios" className="link">
    //           <FaUsers className="iconoLatBar" />
    //           Usuarios
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="nav_cerrar">
    //       <div className="nav cerrar">
    //         <Link to="/cerrarsesion" className="link">
    //           <FaDoorClosed className="iconoLatBar" />
    //           Cerrar
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <>
      <body className='w-full h-screen relative'>
        <nav className='w-full h-14 bg-main flex justify-center items-center'>

          <div className='hidden md:flex w-40 justify-center items-center'>
            <img className="w-32" src={imge1} alt='logo Ujed'/>
          </div>

          <div className="w-full flex justify-between px-3 md:px-0 md:justify-center items-center">
            <Metric className="text-white">Gestion de Minutas</Metric>
            <Icon size='lg' icon={ Bars3Icon } className='text-white md:hidden' onClick={ () => setIsMenuOpen(!isMenuOpen) }/>
          </div>
        </nav>

        {/* mobile menu */}
        <div className={`${ isMenuOpen ? 'flex' : 'hidden' } w-full h-screen absolute top-0 left-0 bg-main z-10`}>
          <Icon size='lg' icon={ XCircleIcon } className='text-white absolute top-3 right-3' onClick={ () => setIsMenuOpen(!isMenuOpen) }/>
          <ul className='w-full h-full flex flex-col justify-center items-center -mt-5 gap-2'>
            { ROUTES.map(({ label, path, icon }) => (
              <li key={ path } className='rounded-md p-1'>
                <Link to={ path } onClick={ () => setIsMenuOpen(false) } className="flex justify-start items-center">
                  <Icon size='sm' icon={ icon } className='text-white'/>
                  <Text className='text-white'>{label}</Text>
                </Link>
              </li>
            )) }
          </ul>
        </div>

        <section className="h-[calc(100vh-56px)] flex">

          <aside className='hidden md:flex w-40 p-2 bg-main flex-col justify-between'>

            <ul className='flex flex-col justify-center items-center gap-2 mt-10'>
              { ROUTES.map(({ label, path, icon }) => (
                <li key={ path } className='w-full hover:bg-red-600 rounded-md p-1'>
                  <Link to={ path } className="flex justify-start items-center">
                    <Icon size='sm' icon={ icon } className='text-white'/>
                    <Text className='text-white'>{label}</Text>
                  </Link>
                </li>
              )) }
            </ul>
              
            <button className='flex justify-start items-center w-full hover:bg-red-600 rounded-md p-1'
              onClick={ onLogout }
            >
              <Icon size='sm' icon={ ArrowLeftOnRectangleIcon } className='text-white'/>
              <Text className='text-white'>Cerrar Sesion</Text>
            </button>

          </aside>
          
          <aside className='w-full h-full overflow-y-auto p-4'>
            { children }
          </aside>

        </section>
      </body>
    </>
  );
}

export default LatBar;
