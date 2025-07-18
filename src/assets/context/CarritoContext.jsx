import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AutorizarContext } from "./AutorizacionesContext.jsx";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // El carrito SIEMPRE debe ser un array
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { usuarioActual } = useContext(AutorizarContext);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://6876a66d814c0dfa653cce17.mockapi.io/api/v1/productos/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error", error);
        setCargando(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    setCarrito([]);
  }, [usuarioActual]);

  const productosFiltrados = productos.filter((producto) =>
    producto?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        toast.success(`El producto ${producto.nombre} se ha agregado al carrito`);
        return [...prev, { producto, cantidad }];
      }
    });
  };

  // Quitar producto del carrito
  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.producto.id !== id));
    toast.error("Producto eliminado del carrito");
  };

  // Vaciar carrito
  const limpiarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("cart");
    toast.info("Compra finalizada!");
  };

  // Cambiar cantidad de un producto
  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.producto.id === id ? { ...item, cantidad } : item
      )
    );
  };

  // Calcular total
  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.producto.price * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        productos,
        cargando,
        error,
        isAuthenticated,
        setIsAuth,
        productosFiltrados,
        busqueda,
        setBusqueda,
        agregarAlCarrito,
        quitarDelCarrito,
        limpiarCarrito,
        cambiarCantidad,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};