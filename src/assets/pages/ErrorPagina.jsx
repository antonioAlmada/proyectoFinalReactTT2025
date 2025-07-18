const Errorpagina = ({ mensaje }) => {
  return (
    <div className="text-center mt-5">
      <h1>ERROR 1O2</h1>
      <p>{mensaje || "No se encuentra disponible esta página por el momento"}</p>
    </div>
  );
};

export default Errorpagina;