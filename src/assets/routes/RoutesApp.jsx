import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Favoritos from '../pages/Favoritos';
import DetalleProducto from '../pages/DetalleProducto';
import FormularioProducto from '../components/FormularioProducto';
import Errorpagina from '../pages/Errorpagina';
import InicioSesion from '../pages/InicioSesion';
import UserValidacionURL from '../hooks/userValidacionURL';
import Papelera from '../pages/Papelera';
import PaginaAcercaDe from '../pages/PaginaAcercaDe';

const RoutesApp = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/login" element={<InicioSesion />} />
    {/* Rutas protegidas */}
    <Route path="/" element={<Home />} />
    {/* Rutas protegidas con validación de usuario */}
    <Route path="/favoritos" element={<UserValidacionURL><Favoritos /></UserValidacionURL>} />
    <Route path="/acerca-de" element={<UserValidacionURL><PaginaAcercaDe /></UserValidacionURL>} />
    {/* Rutas protegidas con validación de usuario y rol de administrador */}
    <Route path="/producto/:id" element={<UserValidacionURL><DetalleProducto /></UserValidacionURL>} />
    <Route path="/crear" element={<UserValidacionURL rol="admin"><FormularioProducto /></UserValidacionURL>} />
    <Route path="/editar/:id" element={<UserValidacionURL rol="admin"><FormularioProducto /></UserValidacionURL>} />
    <Route path="/papelera" element={<UserValidacionURL rol="admin"><Papelera /></UserValidacionURL>} />
    {/* Redirección tras crear o editar producto */}
    <Route path="/producto-creado" element={<Navigate to="/" replace />} />
    <Route path="/producto-editado" element={<Navigate to="/" replace />} />
    {/* Rutas de error */}
    <Route path="/error" element={<Errorpagina />} />
    <Route path="*" element={<Errorpagina mensaje="Página no encontrada (Error 404)" />} />
  </Routes>
);

export default RoutesApp;