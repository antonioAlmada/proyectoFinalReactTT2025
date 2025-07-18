// Esta función recibe un objeto "producto" y devuelve un objeto con los mensajes de error por campo.

export const validarProducto = (producto) => {
  const nuevosErrores = {};

  // Validación nombre/título
  if (!producto.title || producto.title.trim().length < 3)
    nuevosErrores.title = '⚠️ El nombre del producto es obligatorio y debe tener al menos 3 caracteres.';

  // Validación precio
  if (producto.price === '' || isNaN(producto.price) || Number(producto.price) <= 0)
    nuevosErrores.price = '💰 El precio debe ser un número válido y positivo.';

  // Validación descripción
  if (!producto.description || producto.description.trim().length < 10)
    nuevosErrores.description = '📝 La descripción es obligatoria y debe tener al menos 10 caracteres.';

  // Validación imagen
  if (!producto.image || producto.image.trim() === '')
    nuevosErrores.image = '🖼️ La URL de la imagen es obligatoria.';
  else if (!producto.image.startsWith('http'))
    nuevosErrores.image = '🖼️ La URL de la imagen debe comenzar con http o https.';

  // Validación categoría
  if (!producto.category || producto.category.trim().length < 3)
    nuevosErrores.category = '📦 La categoría es obligatoria y debe tener al menos 3 caracteres.';

  // Validación stock
  if (producto.stock === '' || isNaN(producto.stock) || Number(producto.stock) < 0)
    nuevosErrores.stock = '📦 El stock debe ser un número igual o mayor a 0.';

  return nuevosErrores;
};