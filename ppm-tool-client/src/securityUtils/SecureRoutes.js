import React from 'react'
import { Outlet ,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SecureRoutes() {
    const validToken=useSelector(state=>state.security.validToken);
    return  validToken ? <Outlet /> : <Navigate to="/" />;
    
  
}

export default SecureRoutes