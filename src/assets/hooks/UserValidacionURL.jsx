import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import Errorpagina from '../pages/Errorpagina.jsx';

const UserValidacionURL = ({ children, rol }) => {
  const { usuarioActual } = useContext(AutorizarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mostrarError, setMostrarError] = useState(false);

  useEffect(() => {
    if (!usuarioActual) {
      // Solo mostrar error si está entrando directamente a rutas protegidas
      const rutasProtegidas = ['/crear', '/favoritos', '/producto'];
      const esRutaProtegida = rutasProtegidas.some(ruta => location.pathname.startsWith(ruta));

      if (esRutaProtegida) {
        setMostrarError(true);
        const timeout = setTimeout(() => navigate('/login'), 3000);
        return () => clearTimeout(timeout);
      } else {
        navigate('/login');
      }
    }
  }, [usuarioActual, location.pathname, navigate]);

  // Si no hay sesión y se activó error, mostrar página 102
  if (!usuarioActual && mostrarError) {
    return <Errorpagina mensaje="ERROR 102: Debe iniciar sesión para acceder a esta página" />;
  }

  // Si hay sesión pero el rol no coincide
  if (rol && usuarioActual.rol !== rol) {
    return <Errorpagina mensaje="ERROR 102: No tiene permisos para acceder a esta página" />;
  }

  return children;
};

export default UserValidacionURL;
