import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({element:Element}) => {
    const location = useLocation();
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : null; 
    
    return user ? <Element /> : <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute;