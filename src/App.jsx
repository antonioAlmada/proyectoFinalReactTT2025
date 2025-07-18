import { BrowserRouter } from 'react-router-dom'; 
import Menu from './assets/components/Navbar.jsx';
import Footer from './assets/components/Footer.jsx';
import { ProductoProvider } from './assets/context/ProductoContext.jsx';
import { AutorizarProvider } from './assets/context/AutorizacionesContext.jsx';
import { CarritoProvider } from './assets/context/CarritoContext.jsx';
import { SearchProvider } from './assets/context/SearchContext.jsx';
// Importamos el componente que se encargará de todas nuestras rutas
import RoutesApp from './assets/routes/RoutesApp'; 

// Importa CSS global de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    // Proveedores de contexto para autorizaciones y productos
    // Envuelven toda la aplicación para que todos los componentes hijos tengan acceso a los contextos.
        <AutorizarProvider>
          <ProductoProvider>
              <CarritoProvider>
                
                <BrowserRouter>
                  <SearchProvider>
                    <Menu />
                    {/* Componente que maneja las rutas de la aplicación */}
                    <RoutesApp />
                    <Footer />
                  </SearchProvider>
                </BrowserRouter>
              </CarritoProvider>
            
          </ProductoProvider>
        </AutorizarProvider>
  );
}

export default App;