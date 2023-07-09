import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import DashRoutes from './DashRoutes';
import LoginRoutes from './LoginRoutes';

const AppRouter = () => {

    return (
        <>
            <Routes>

                <Route path="/*" element={
                    <PublicRoutes>
                        <LoginRoutes />
                    </PublicRoutes>
                 } />

                <Route path="/Dash/*" element={
                    <PrivateRoutes>
                        <DashRoutes />
                    </PrivateRoutes>
                } />

            </Routes>
        </>
    )

}


export default AppRouter;