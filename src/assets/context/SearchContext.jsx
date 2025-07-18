import { createContext, useState, useContext } from "react";
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [busqueda, setBusqueda] = useState("");
 
  const [resultados, setResultados] = useState([]);

  return (
    <SearchContext.Provider value={{ busqueda, setBusqueda, resultados, setResultados }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}