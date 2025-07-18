import { useState } from 'react'; // Importa el hook useState de React

const LoginForm = ({ onSubmit, error }) => { 
  // Estados locales para usuario y clave
  const [usuario, setUsuario] = useState(''); // Estado para el campo usuario
  const [clave, setClave] = useState('');     // Estado para el campo clave

  // Maneja el envío del formulario y llama a la función recibida por props
  const handleSubmit = (e) => { // Función que maneja el submit del formulario
    e.preventDefault();         // Previene el comportamiento por defecto del form
    onSubmit(usuario, clave);   // Llama a la función onSubmit pasando usuario y clave
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}> {/* Formulario con clase y evento submit */}
      <div className="campo-formulario"> {/* Contenedor del campo usuario */}
        <label htmlFor="usuario">Usuario:</label> {/* Etiqueta para el input usuario */}
        <input
          id="usuario" // Identificador del input
          type="text" // Tipo de input texto
          value={usuario} // Valor actual del estado usuario
          onChange={(e) => setUsuario(e.target.value)} // Actualiza el estado usuario al escribir
          placeholder="Ingrese su usuario" // Texto de ayuda
        />
      </div>
      <div className="campo-formulario"> {/* Contenedor del campo clave */}
        <label htmlFor="clave">Clave:</label> {/* Etiqueta para el input clave */}
        <input
          id="clave" // Identificador del input
          type="password" // Tipo de input password
          value={clave} // Valor actual del estado clave
          onChange={(e) => setClave(e.target.value)} // Actualiza el estado clave al escribir
          placeholder="Ingrese su clave" // Texto de ayuda
        />
      </div>
      <button type="submit" className="btn-ingresar">Ingresar</button> {/* Botón para enviar el formulario */}
      {/* Muestra mensaje de error si existe */}
      {error && <div className="alerta-error visible">{error}</div>} {/* Mensaje de error si hay */}
    </form>
  );
};

export default LoginForm; 