import { useContext } from 'react'; // Importa el hook useContext de React
import { ProductoContext } from '../context/ProductoContext'; // Importa el contexto de productos
import CardProducto from '../components/CardProducto'; // Importa el componente de la card de producto
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap para el layout
import { Link } from 'react-router-dom'; // Importa Link para navegación interna

const Favoritos = () => { // Componente funcional Favoritos
  const { productos, favoritos } = useContext(ProductoContext); // Obtiene productos y favoritos del contexto

  // Filtra los productos que están en favoritos y no están eliminados
  const productosFavoritos = productos.filter(
    p => favoritos.includes(p.id) && !p.eliminado
  );

  return (
    <Container className="mt-5"> {/* Contenedor principal con margen superior */}
      <h2 className="text-center mb-4">💖 Mis Favoritos</h2> {/* Título centrado */}

      {productosFavoritos.length > 0 ? ( // Si hay productos favoritos
        <Row className="justify-content-center"> {/* Fila de Bootstrap centrada */}
          {productosFavoritos.map(producto => ( // Mapea cada producto favorito
            <Col
              key={producto.id} // Clave única para cada columna
              xs={12} // Ocupa toda la fila en móviles
              sm={productosFavoritos.length === 1 ? 10 : 6} // Si hay uno solo, ocupa más espacio en sm
              md={productosFavoritos.length >= 3 ? 4 : 5} // Si hay 3 o más, ocupa 4 columnas en md, si no 5
              className="d-flex justify-content-center mb-4" // Centra el contenido y agrega margen abajo
            >
              <CardProducto producto={producto} modo="favoritos" /> {/* Renderiza la card del producto en modo favoritos */}
            </Col>
          ))}
        </Row>
      ) : ( // Si no hay productos favoritos
        <div className="text-center mt-5"> {/* Contenedor centrado con margen superior */}
          <div style={{ fontSize: '5rem', color: '#ccc' }}>🤍</div> {/* Icono grande de corazón vacío */}
          <h4 className="mt-3">Aún no tienes productos favoritos</h4> {/* Mensaje informativo */}
          <p className="text-muted">¡Explora la tienda y agrega algunos!</p> {/* Mensaje adicional */}
          <Link to="/"> {/* Enlace al inicio */}
            <Button variant="dark" className="mt-3">
              Ir al inicio {/* Texto del botón */}
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Favoritos;
