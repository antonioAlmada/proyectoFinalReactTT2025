import { createContext, useState, useEffect  } from "react";

export const AutorizarContext = createContext(null);

export const AutorizarProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  return (
    <AutorizarContext.Provider value={{ usuarioActual, setUsuarioActual }}>
      {children}
    </AutorizarContext.Provider>
  );
};
