import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';

export function RequireAuth() {
  const { user, data } = useStore();
  const location = useLocation();
  if (!user || !data) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}