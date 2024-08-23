// import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Needs proper checking

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute;

