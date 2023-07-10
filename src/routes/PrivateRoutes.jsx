import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = ({ children }) => {
    
    const idU = Cookies.get('idUser');
    // const idU = 1;

    // if the user ID is defined in the cookies, the dashboard content is shown
    // if not, the login form is shown

    return ( idU !== undefined )
        ? children
        : <Navigate to={ '/Login' } />
}

export default PrivateRoutes;