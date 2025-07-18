import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductoContext } from '../context/ProductoContext.jsx';
import CardProducto from '../components/CardProducto.jsx';
import { Carousel, Row, Col } from 'react-bootstrap';
import '../css/home.css';
import Carrito from '../components/Carrito.jsx';
import { useSearch } from '../context/SearchContext.jsx';
import { CarritoContext } from '../context/CarritoContext.jsx';
import Img1 from '../images/imagen1.jpg';
import Img2 from '../images/imagen2.jpg';
import Img3 from '../images/imagen3.jpg';
import Img4 from '../images/imagen4.jpg';

const Home = () => {
  const { productos } = useContext(ProductoContext);
  const { busqueda, setBusqueda, resultados, setResultados } = useSearch(); // Usa el contexto de búsqueda
  const navigate = useNavigate();
  const [mensajeNoEncontrado, setMensajeNoEncontrado] = useState('');
  const { carrito = [] } = useContext(CarritoContext); // <-- valor por defecto

  // Estado para mostrar/ocultar el carrito
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);

  // Abrir el carrito automáticamente cuando se agregue un producto
  useEffect(() => {
    if (carrito.length > 0) {
      setIsCarritoOpen(true);
    }
  }, [carrito]);

  
  useEffect(() => {
    // 1. Filtrar productos no eliminados primero
    let productosFiltrados = productos.filter(p => !p.eliminado);

    // 2. Aplicar filtro de búsqueda si hay un término
    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
      );
      // Establecer mensaje si no se encuentran resultados con la búsqueda
      if (productosFiltrados.length === 0) {
        setMensajeNoEncontrado(`No se encontraron productos con el nombre "${busqueda}".`);
      } else {
        setMensajeNoEncontrado(''); // Limpiar mensaje si se encuentran resultados
      }
    } else {
      // Si no hay término de búsqueda, asegurar que no haya mensaje de no encontrado
      setMensajeNoEncontrado('');
    }
    
    // 3. Actualizar el estado 'resultados' con la lista final filtrada
    setResultados(productosFiltrados);
  }, [productos, busqueda, setResultados]); // Dependencias del efecto

 
  useEffect(() => {
    
    if (location.pathname === '/' && busqueda) {
      setBusqueda(''); // Limpia el término de búsqueda
    }
  }, [location.pathname]); // Depende de la ruta actual



  // Manejar el clic en el botón "Volver a la página de inicio"
  const handleVolverInicio = () => {
    setBusqueda(""); // Limpia el término de búsqueda en el contexto
    
    setResultados(productos.filter(p => !p.eliminado)); 
    setMensajeNoEncontrado(""); // Limpia el mensaje de no encontrado
    navigate('/'); // Asegura que estemos en la ruta de inicio
  };

  return (
    <div>
      {/* Carrito se renderiza aquí, antes del contenido principal */}
      <Carrito isOpen={isCarritoOpen} onClose={() => setIsCarritoOpen(false)} />

      <Carousel>
        <Carousel.Item>
          <img 
            className="d-block w-100 carousel-img-fija"
            src= {Img1}
            alt="Banner 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img-fija"
            src= {Img2}
            alt="Banner 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img-fija"
            src= {Img3}
            alt="Banner 3"
            />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img-fija"
            src= {Img4}
            alt="Banner 4"
          />
        </Carousel.Item>
      </Carousel>

      <h1>Todos Nuestros Productos</h1>
      <p className="text-center">¡Descubre nuestra amplia variedad de productos!</p>
      <div className="container mt-4">
        {mensajeNoEncontrado ? (
          <div className="alert alert-warning text-center" role="alert">
            {mensajeNoEncontrado}
            <button
              className="btn btn-link"
              onClick={handleVolverInicio} 
            >
              Volver a la página de inicio
            </button>
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-center">
            {resultados.map(producto => (
              <Col
                key={producto.id}
                xs={12} sm={6} md={4} lg={3}
                className="mb-4 d-flex justify-content-center" 
              >
                <CardProducto producto={producto} />
              </Col>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
