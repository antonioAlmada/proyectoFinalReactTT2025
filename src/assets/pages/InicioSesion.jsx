import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizarContext } from '../context/AutorizacionesContext.jsx';
import validarUsuario from '../hooks/validacionUser.js';
import LoginForm from '../components/LoginForm.jsx';
import '../css/iniciarSesion.css';

const InicioSesion = () => {
  const { setUsuarioActual } = useContext(AutorizarContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (usuario, clave) => {
    const resultado = validarUsuario(usuario, clave);
    if (!resultado.valido) {
      const mensajes = Object.values(resultado.errores).join('\n');
      setError(mensajes);
      return;
    }
    setUsuarioActual({ nombre: resultado.nombre, rol: resultado.tipo });
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2>¡¡ Bienvenidos a nuestra !!<br />Tienda Me Gusta Jujuy</h2>
        <p>¡Inicie sesión para obtener nuevas funciones!</p>
        
      </div>
      <div className="login-right">
        <div className="login-box">
          <h3>Inicie Sesión</h3>
          <LoginForm onSubmit={handleLogin} error={error} />
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
