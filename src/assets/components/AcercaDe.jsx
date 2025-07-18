import { Card, Row, Col } from "react-bootstrap";

import '../css/acercaDe.css';


import antonioImg from '../images/antonio.jpeg';

const AcercaDe = ()=>{
        const desarrolladores = [
      
    {
      name: 'Antonio Almada',
      rol: 'Desarrollador Backend / Lógica',
      img: antonioImg,
    },
    ];
    

    return(
        <div className="acerca-de-container">
        <h1>Acerca de Me Gusta Jujuy</h1> 
            <p className="descripcion-proyecto">
                ¡Bienvenido a Me Gusta Jujuy, tu tienda online de referencia para productos regionales de Jujuy! 
            </p>
            <p className="descripcion-proyecto">
                Nos dedicamos a ofrecerte lo mejor de nuestra tierra: 
                artesanías, alimentos típicos y souvenirs únicos que reflejan la cultura y tradición jujeña. 
                Garantizamos calidad y autenticidad en cada uno de nuestros productos, 
                para que puedas disfrutar de lo mejor que Jujuy tiene para ofrecer. 
            </p>
            <p className="descripcion-proyecto">
                En Me Gusta Jujuy, encontrar el regalo perfecto o un recuerdo especial es fácil, rápido y divertido. 
                ¡Explora nuestras colecciones y lleva un pedacito de Jujuy a tu hogar con solo un clic!
            </p>

        <div className="tecnologias-usadas">
            <h2>Tecnologías Utilizadas</h2>
            <ul>
            <li>Frontend: React.js (con Hooks como `useState`, `useMemo`, `useCallback`)</li>
            <li>Estilos: Bootstrap</li>
            <li>Lenguaje: JavaScript</li>
            <li>Control de Versiones: Git & GitHub</li>
            </ul>
        </div>

        <div className="equipo-desarrollo">
        <h2>Nuestro Equipo de Desarrollo</h2>
        <Row className="g-4">
          {desarrolladores.map((dev, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={dev.img}
                  alt={dev.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Text>{dev.rol}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

        <div className="contacto">
            <h2>Contacto</h2>
            <p>
            Para cualquier consulta o sugerencia sobre el sistema, no duden en contactarnos.
            </p>
            <p>¡Gracias por usar nuestra aplicación!</p>
        </div>
        </div>
    )
}

export default AcercaDe;