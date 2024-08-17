
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
export default function ProtectedRoute() {
  const {isAuth, loading} =useAuth();

  if(loading) return;
 if(!isAuth) return <Navigate to="/login" replace/>;
  return <Outlet/>
}