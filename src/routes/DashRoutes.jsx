import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LatBar from "../components/lat_com";
import Loading from '../components/Loading';

const InicioPage = lazy(() => import('../pages/inicio'));
const MinutasPage = lazy(() => import('../pages/minutas'));
const GenerarMinutaPage = lazy(() => import('../pages/generarMinuta'));
const MinutaSeleccionadaPage = lazy(() => import('../pages/minuta_Seleccionada'));
const GenerarAcuerdoPage = lazy(() => import('../pages/generarAcuerdo'));
const SeguimientoPage = lazy(() => import('../pages/seguimiento'));
const PerfilPage = lazy(() => import('../pages/perfil'));
const UsuariosPage = lazy(() => import('../pages/usuarios'));
const NotFoundPage = lazy(() => import('../pages/no_funciona'));
const EditarMinutaPage = lazy(() => import('../pages/editarMinuta'));
const EditarAcuerdoPage = lazy(() => import('../pages/editarAcuerdo'));
const PDFViewerPage = lazy(() => import('../pages/pdf'));


const DashRoutes = () => {

    return (
        <>
            <LatBar> 
                <Suspense fallback={ <Loading /> } >
                    <Routes>
                        <Route path="/inicio" element={ <InicioPage /> } />
                        <Route path="/minutas" element={ <MinutasPage /> } />
                        <Route path="/minutas/generarminuta" element={ <GenerarMinutaPage /> } />
                        <Route path="/minutas/:id" element={ <MinutaSeleccionadaPage /> } />
                        <Route path="/minutas/:idA/generaracuerdo" element={ <GenerarAcuerdoPage /> } />
                        <Route path="/minutas/:idA/seguimiento" element={ <SeguimientoPage /> } />
                        <Route path="/perfil" element={ <PerfilPage /> } />
                        <Route path="/usuarios" element={ <UsuariosPage /> } />
                        <Route path="/minutas/editar/:idM" element={ <EditarMinutaPage /> } />
                        <Route path="/acuerdos/editar/:idA" element={ <EditarAcuerdoPage /> } />
                        <Route path="/pdf/:idM" element={ <PDFViewerPage /> } />
                        <Route path="/" element={ <Navigate to="/Dash/inicio" /> } />

                        {/* If any route match, show the not found page */}
                        <Route path="*" element={ <NotFoundPage /> } />
                    </Routes>
                </Suspense>
            </LatBar>
        </>
    )

}

export default DashRoutes