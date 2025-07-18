import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import { useSearch } from '../context/SearchContext.jsx';


const Menu = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const { usuarioActual, setUsuarioActual } = useContext(AutorizarContext);
  const { setBusqueda, setResultados } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Previene el recargado de la página al enviar el formulario
    if (localSearchTerm.trim()) {
      setBusqueda(localSearchTerm.trim()); // Actualiza el término de búsqueda en el contexto
      setResultados([]); 
      navigate('/'); // Navega a la página de inicio (Home) para mostrar los resultados
      setLocalSearchTerm(''); // Limpia el input de la barra de búsqueda
    }
  };

  // Cierra sesión y redirige al Home
  const cerrarSesion = () => {
    setUsuarioActual(null);
    navigate('/');
  };

  // Redirige a la página de login
  const irALogin = () => navigate('/login');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda Me Gusta Jujuy</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {usuarioActual && (
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
            )}
            {usuarioActual?.rol === 'admin' && (
              <>
                <Nav.Link as={Link} to="/crear">Crear Producto</Nav.Link>
                <Nav.Link as={Link} to="/papelera">Papelera</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/acerca-de">Acerca de</Nav.Link>
          </Nav>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Search"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          {/* Si NO hay usuario logueado, muestra botón de iniciar sesión */}
          {!usuarioActual && (
            <Button variant="outline-light" size="sm" onClick={irALogin}>
              Iniciar sesión
            </Button>
          )}
          {/* Info de usuario logueado y botón de cierre */}
          {usuarioActual && (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Rol: <strong>{usuarioActual?.rol}</strong>
              </span>
              <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </div>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;