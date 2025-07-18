import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { validarProducto } from '../hooks/userValidacionProducto.js';
import '../css/formulario.css';

const FormularioProducto = () => {
  const { usuarioActual } = useContext(AutorizarContext);
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useContext(ProductoContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formulario, setFormulario] = useState({
    id: null,
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: 0
  });

  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  // Precarga el producto si hay id
  useEffect(() => {
    if (id) {
      const productoEncontrado = productos.find(p => String(p.id) === String(id));
      if (productoEncontrado) {
        setFormulario({
          ...productoEncontrado,
          price: productoEncontrado.price || '',
          stock: productoEncontrado.stock || 0
        });
        setModoEdicion(true);
      } else {
        setError('Producto no encontrado.');
      }
    } else {
      setModoEdicion(false);
      setFormulario({
        id: null,
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
        stock: 0
      });
    }
  }, [id, productos]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
    setErrores(prev => ({ ...prev, [name]: undefined }));
    setError('');
  };

  // Enviar el formulario (crear o editar producto)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const erroresVal = validarProducto(formulario);
    setErrores(erroresVal);

    // Mostrar todos los mensajes de validación
    if (Object.keys(erroresVal).length > 0) {
      setError('Por favor corrige los errores antes de continuar.');
      return;
    }

    // Validar que no haya productos repetidos por título
    const tituloIngresado = formulario.title.trim().toLowerCase();
    const productoRepetido = productos.find(
      p =>
        p.title.trim().toLowerCase() === tituloIngresado &&
        (!modoEdicion || String(p.id) !== String(formulario.id))
    );
    if (productoRepetido) {
      setError('Ya existe un producto con ese nombre.');
      setErrores(prev => ({ ...prev, title: 'Ya existe un producto con ese nombre.' }));
      return;
    }

    if (modoEdicion) {
      await editarProducto({ ...formulario, eliminado: false });
    } else {
      await agregarProducto({ ...formulario, eliminado: false });
    }
    navigate('/');
  };

  // Elimina el producto y lo marca como eliminado (borrado lógico)
  const handleEliminar = () => {
    if (id && window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(Number(id));
      navigate('/papelera');
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (usuarioActual?.rol !== 'admin') return null;

  return (
    <Container className="formulario-container mt-4">
      <h2>{modoEdicion ? 'Editar Producto' : 'Crear Producto'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="formulario-fila">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formulario.title}
                onChange={handleChange}
                isInvalid={!!errores.title}
              />
              <Form.Control.Feedback type="invalid">
                {errores.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formulario.price}
                onChange={handleChange}
                isInvalid={!!errores.price}
                min={0}
              />
              <Form.Control.Feedback type="invalid">
                {errores.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formulario.category}
                onChange={handleChange}
                isInvalid={!!errores.category}
              />
              <Form.Control.Feedback type="invalid">
                {errores.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formulario.stock}
                onChange={handleChange}
                isInvalid={!!errores.stock}
                min={0}
              />
              <Form.Control.Feedback type="invalid">
                {errores.stock}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formulario.description}
                onChange={handleChange}
                isInvalid={!!errores.description}
              />
              <Form.Control.Feedback type="invalid">
                {errores.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formulario.image}
                onChange={handleChange}
                isInvalid={!!errores.image}
              />
              <Form.Control.Feedback type="invalid">
                {errores.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-4">
          <Button variant="dark" type="submit" className="me-2">
            {modoEdicion ? 'Actualizar' : 'Crear'}
          </Button>
          <Button variant="secondary" onClick={handleCancelar} className="me-2">
            Cancelar
          </Button>
          {modoEdicion && (
            <Button variant="danger" onClick={handleEliminar}>
              Eliminar
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default FormularioProducto;
