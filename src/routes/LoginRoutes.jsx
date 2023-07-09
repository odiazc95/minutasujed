import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


const LoginPage = lazy(() => import('../pages/login'));
const NotFound = lazy(() => import('../pages/no_funciona'));

const LoginRoutes = () => {

    return (
        <>
            <Suspense fallback={ <div>Loading...</div> } >
                <Routes>
                    <Route path="/Login" element={ <LoginPage /> } />
                    <Route path="/" element={ <Navigate to="/Login" /> } />

                    {/* If any route match, show the not found page */}
                    <Route path="*" element={ <NotFound /> } />
                </Routes>
            </Suspense>
        </>
    )

}

export default LoginRoutes;