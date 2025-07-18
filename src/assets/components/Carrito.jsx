import React, { useContext } from 'react'
import '../css/styleCart.css'
import { CarritoContext } from '../context/CarritoContext.jsx'
import { toast } from 'react-toastify'

const Carrito = ({ isOpen, onClose }) => {
    const { carrito = [], quitarDelCarrito, limpiarCarrito, totalCarrito } = useContext(CarritoContext)

    // Alerta antes de vaciar el carrito
    const handleVaciarCarrito = () => {
        if (window.confirm('¿Estás seguro que deseas vaciar el carrito?')) {
            limpiarCarrito();
            toast.info('Carrito vaciado');
        }
    };

    // Alerta antes de finalizar la compra
    const handleFinalizarCompra = () => {
        if (window.confirm('¿Deseas finalizar la compra?')) {
            limpiarCarrito();
            onClose();
            toast.success('¡Compra finalizada y carrito vaciado!');
        }
    };

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
                <button style={{ color: 'blue' }} onClick={onClose} className='close-button'>X</button>
            </div>
            <div className='cart-content'>
                {carrito.length === 0 ? (
                    <p style={{ color: 'red' }}>El carrito está vacío</p>
                ) : (
                    <>
                        <ul className='cart-item'>
                            {carrito.map((item, index) => (
                                <li key={item.producto.id} style={{ color: 'black' }}>
                                    {item.producto.title} - ${item.producto.price} - Cantidad: {item.cantidad}
                                    <button
                                        title="Quitar producto"
                                        onClick={() => {
                                            quitarDelCarrito(item.producto.id);
                                            toast.info('Producto eliminado del carrito');
                                        }}
                                        style={{
                                            marginLeft: '10px',
                                            color: '#fff',
                                            background: '#dc3545',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '32px',
                                            height: '32px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            boxShadow: '0 2px 6px rgba(220,53,69,0.15)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                    >X
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className='cart-footer'>
                            <p style={{ color: 'blue' }}>
                                Total: ${totalCarrito ? totalCarrito.toFixed(2) : '0.00'}
                            </p>
                            <button
                                style={{ color: 'black', marginRight: '10px' }}
                                onClick={handleVaciarCarrito}
                                className='btnCheckout'
                            >
                                Vaciar Carrito
                            </button>
                            <button
                                style={{ color: 'white', background: '#007bff' }}
                                className='btnCheckout'
                                onClick={handleFinalizarCompra}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Carrito;
