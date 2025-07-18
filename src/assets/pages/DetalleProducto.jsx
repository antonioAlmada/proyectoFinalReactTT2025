import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import '../css/detalleProducto.css';

const DetalleProducto = () => {
  // Obtiene el ID del producto desde la URL
  const { id } = useParams();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Acceso al contexto de productos para obtener productos, favoritos y funciones
  const { productos, toggleFavorito, favoritos, eliminarProducto } = useContext(ProductoContext);
  // Acceso al contexto de usuario para saber quién está logueado
  const { usuarioActual } = useContext(AutorizarContext);

  // Busca el producto que coincide con el ID recibido por URL
  const producto = productos.find(p => p.id === parseInt(id));

  // Si no se encuentra el producto, muestra un mensaje
  if (!producto) return <p>Producto no encontrado</p>;

  // Determina si el producto está en la lista de favoritos del usuario
  const esFavorito = favoritos.includes(producto.id);

  // Maneja la eliminación del producto (solo admin)
  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(producto.id);
      navigate('/');
    }
  };

  return (
    <div className="p-4 detalle-container">
      {/* Título del producto */}
      <h2>{producto.title}</h2>
      {/* Imagen del producto */}
      <img src={producto.image} style={{ width: '200px' }} />
      {/* Descripción del producto */}
      <p>{producto.description}</p>
      {/* Precio del producto */}
      <p>Precio: {producto.price} USD</p>
      {/* Categoría del producto */}
      <p>Categoría: {producto.category}</p>

      {/* Botones según el usuario */}
      <div className="detalle-botones">
        {/* Botón para agregar o quitar de favoritos */}
        <button className="btn-detalle" onClick={() => toggleFavorito(producto.id)}>
          {esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </button>

        {/* Botones de editar y eliminar solo visibles para el admin */}
        {usuarioActual === 'admin' && (
          <>
            {/* Botón para ir a la edición del producto */}
            <Link to={`/editar/${producto.id}`}>
              <button className="btn-detalle">Editar</button>
            </Link>

            {/* Botón para eliminar el producto */}
            <button className="btn-detalle" onClick={handleEliminar}>
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetalleProducto;
