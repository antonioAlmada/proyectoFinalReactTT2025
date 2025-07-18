import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import { Card, Button, Container, Alert } from 'react-bootstrap';

const Papelera = () => {
  const { productos, editarProducto } = useContext(ProductoContext);
  const { usuarioActual } = useContext(AutorizarContext);

  // Verifica si el usuario actual es administrador
  if (!usuarioActual || usuarioActual.rol !== 'admin') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Acceso denegado. Solo administradores pueden acceder a la papelera.</Alert>
      </Container>
    );
  }

  // Filtra los productos eliminados
  const productosEliminados = productos.filter(p => p.eliminado);

  // Función para restaurar producto
  const restaurarProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const productoRestaurado = { ...producto, eliminado: false };
      editarProducto(productoRestaurado);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Papelera de productos</h2>
      {productosEliminados.length === 0 ? (
        <Alert variant="info">No hay productos en la papelera.</Alert>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {productosEliminados.map(producto => (
            <Card key={producto.id} className="m-2" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={producto.image} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.price} USD</Card.Text>
                <Button variant="success" onClick={() => restaurarProducto(producto.id)}>Restaurar</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Papelera;