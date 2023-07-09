// import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { AuthProvider } from "./components/AuthContext";
// import Inicio from "./pages/inicio";
// import Minutas from "./pages/minutas";
// import GenerarMinuta from "./pages/generarMinuta";
// import MinutaSeleccionada from "./pages/minuta_Seleccionada";
// import GenerarAcuerdo from "./pages/generarAcuerdo";
// import Seguimiento from "./pages/seguimiento";
// import Perfil from "./pages/perfil";
// import Usuarios from "./pages/usuarios";
// import LatBar from "./components/lat_com";
// import styleApp from "./App.css";
// import Login from "./pages/login";
// import NotFound from "./pages/no_funciona";
// import EditarMinuta from "./pages/editarMinuta";
// import EditarAcuerdo from "./pages/editarAcuerdo";
// import PDFViewer from "./pages/pdf";
// import CerrarSesion from "./components/Cerrar_Sesion";
// import Cookies from 'js-cookie';
// import { redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {

    // const idU = Cookies.get('idUser');

    return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)

  // // if (idU !== undefined) {
  //   if ( true ) {
  //   // Si hay un ID de usuario definido en las cookies, se muestra el contenido autenticado
  //   return (
  //     <Router>
  //       <div className="App" style={styleApp}>
  //         <div className="Container-body">
  //           <Switch>
  //             <Route path="/minutas/:idA/seguimiento">
  //               <Seguimiento />
  //             </Route>
  //             <Route path="/minutas/:idA/generaracuerdo">
  //               <GenerarAcuerdo />
  //             </Route>
  //             <Route path="/acuerdos/editar/:idA">
  //               <EditarAcuerdo />
  //             </Route>
  //             <Route path="/minutas/editar/:idM">
  //               <EditarMinuta />
  //             </Route>
  //             <Route path="/minutas/generaminuta">
  //               <GenerarMinuta />
  //             </Route>
  //             <Route path="/minutas/:id">
  //               <MinutaSeleccionada />
  //             </Route>
  //             <Route path="/pdf/:idM">
  //               <PDFViewer />
  //             </Route>
  //             <Route path="/inicio">
  //               <Inicio />
  //             </Route>
  //             <Route path="/minutas">
  //               <Minutas />
  //             </Route>
  //             <Route path="/perfil">
  //               <Perfil />
  //             </Route>
  //             <Route path="/cerrarsesion">
  //               <CerrarSesion />
  //             </Route>
  //             <Route path="/usuarios">
  //               <Usuarios />
  //             </Route>
  //             <Route component={NotFound} />
  //           </Switch>
  //           {window.location.pathname !== "/" && <LatBar />}
  //         </div>
  //       </div>
  //     </Router>
  //   );
  // } 
  // else {
  //   return (
  //     <Router>
  //       <div className="App">
  //         <div className="">
  //           <Switch>
  //             <Route exact path="/">
  //               <Login />
  //             </Route>
  //             <Route component={NotFound} />
  //           </Switch>
  //         </div>
  //       </div>
  //     </Router>
  //   );
  // }
}

export default App;
