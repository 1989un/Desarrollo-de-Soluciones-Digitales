function header() {
  return (
      <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-purple-700">
          TallaJusta AI
        </h1>

        <nav className="flex gap-6 text-gray-600">
          <a href="#">Inicio</a>
          <a href="#">Catálogo</a>
          <a href="#">Descubre tu talla</a>
        </nav>
      </header>
  );
}
//Significa que estamos permitiendo 
// que otros archivos puedan importar y utilizar este componente.
export default header;