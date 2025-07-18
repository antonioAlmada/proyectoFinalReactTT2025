import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import { CarritoContext } from '../context/CarritoContext.jsx';

const CardProducto = ({ producto, modo }) => {
  const { toggleFavorito, favoritos, eliminarProducto } = useContext(ProductoContext);
  const { usuarioActual } = useContext(AutorizarContext);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const esFavorito = favoritos.includes(producto.id);

  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(producto.id);
      navigate('/');
    }
  };

  // Maneja el clic en "Agregar al carrito"
  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, 1);
  };

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      {/* Imagen del producto */}
      <Card.Img variant="top" src={producto.image} style={{ height: '200px', objectFit: 'contain' }} />
      <Card.Body>
        {/* Título y precio */}
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text>{producto.price} USD</Card.Text>
        {/* Solo muestra los botones si hay usuario logueado */}
        {usuarioActual && (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {/* Mostrar solo los botones permitidos */}
            {(modo !== 'favoritos' && usuarioActual.rol === 'admin') && (
              <>
                <Link to={`/editar/${producto.id}`}>
                  <Button variant="dark" className="text-white">Editar</Button>
                </Link>
                <Button variant="dark" className="text-white" onClick={handleEliminar}>Eliminar</Button>
              </>
            )}
            {/* Botón VER MÁS visible solo para usuarios logeados */}
            <Link to={`/producto/${producto.id}`}>
              <Button variant="dark" className="text-white">Ver más</Button>
            </Link>
            {/* Botón para agregar o quitar favoritos Solo para Usuarios logeados */}
            <Button
              variant={esFavorito ? 'danger' : 'outline-danger'}
              onClick={() => toggleFavorito(producto.id)}
            >
              {esFavorito ? '❤' : '🤍'}
            </Button>
            {/* Botón para agregar al carrito */}
            <Button
              variant="success"
              onClick={handleAgregarCarrito}
            >
              Agregar al carrito
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardProducto;