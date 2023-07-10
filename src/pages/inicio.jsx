import React from "react";
// import '../assets/styles/inicio.css'
import Cookies from 'js-cookie';
import { Metric, Title, Text, List, ListItem } from "@tremor/react";

const STEPTS = [
    { label: 'Entrar a la interfaz de minutas o en el botón de generar minuta.' },
    { label: 'Generar la minuta con los datos. Volverás a la interfaz anterior al terminar.' },
    { label: 'Añade los invitados a esa minuta. Puedes añadir varios al mismo tiempo.' },
    { label: 'Añade acuerdos, los invitados serán candidatos a ser responsable de algún acuerdo.' },
    { label: 'Al añadir un seguimiento, puedes seleccionar una minuta anterior para traer todos los acuerdos pasados, una vez identificada la minuta puedes ir editando los acuerdos y verificando el estado en que se encuentran.' },
    { label: 'Por último, al añadir una conclusión a la minuta acuerdos y el responsable de levantarla. Finalizara el proceso y podrás descargar el PDF.' },
]

const Inicio = () =>{
    const idU = Cookies.get('idUser');
    console.log("GOOOOOOOOOO: "+idU);

    return(
    // <div className="contenedor">
    //     <div className="contenedor_inicio">
    //         <p className="titulo_inicio">Bienvenido</p><br/>
    //         <p className="text_inico">Utiliza el menú para acceder a las áreas del sitio en donde puedes realizar cambios o consultar información. No olvides cerrar la sesión (en la parte superior derecha de esta pantalla) antes de cerrar la pestaña o si vas a estar alejado de tu computadora o dispositivo.</p><br/>
    //         <p className="text_inico">Este es el sistema de gestión de minutas. Hecho para registrar, invitar y dar seguimiento a las reuniones. Para generar una minuta debes seguir los siguientes pasos:</p><br/>

    //         <ul className="lista_inicio">
    //             <li className="cont_inicio">Entrar a la interfaz de minutas o en el botón de generar minuta.</li>
    //             <li className="cont_inicio">Generar la minuta con los datos. Volverás a la interfaz anterior al terminar.</li>
    //             <li className="cont_inicio">Añade los invitados a esa minuta. Puedes añadir varios al mismo tiempo.</li>
    //             <li className="cont_inicio">Añade acuerdos, los invitados serán candidatos a ser responsable de algún acuerdo.</li>
    //             <li className="cont_inicio">Al añadir un seguimiento, puedes seleccionar una minuta anterior para traer todos los acuerdos pasados, una vez identificada la minuta puedes ir editando los acuerdos y verificando el estado en que se encuentran.</li>
    //             <li className="cont_inicio">Por último, al añadir una conclusión a la minuta acuerdos y el responsable de levantarla. Finalizara el proceso y podrás descargar el PDF.</li>
    //         </ul>    
    //     </div>
    // </div>
        <>
            <Metric>Bienvenido</Metric>

            <Text className='mt-2'>
                Utiliza el menú para acceder a las áreas del sitio en donde puedes realizar cambios o consultar información. 
                No olvides cerrar la sesión (en la parte superior derecha de esta pantalla) antes de cerrar la pestaña o si vas a 
                estar alejado de tu computadora o dispositivo.
            </Text>

            <Text className='mt-2'>
                Este es el sistema de gestión de minutas. Hecho para registrar, invitar y dar seguimiento a las reuniones.
            </Text>

            <Title className='mt-6'>
                Para generar una minuta debes seguir los siguientes pasos:
            </Title>
            <List className="max-w-lg">
                { STEPTS.map((step, index) => (
                    <ListItem key={ index } className='whitespace-normal'>
                        <span>
                            { index + 1 } { step.label }
                        </span>
                    </ListItem>
                )) }
            </List>
        </>
    )
}

export default Inicio;