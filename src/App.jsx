import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css';
import Header from "./components/header";
import Hero from "./components/hero";
import SizeForm from "./components/sizeForm";
import datos from "./data/vestidos.json";

function App() {

  const [mostrarformulario,setMostrarFormulario]=useState(false);
  const [vestidoSeleccionado, setVestidoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal]=useState(false);
  const vestidos = datos.vestidos;
  return (
    <div className="min-h-screen bg-pink-50">
      <Header/>

      <div className="container mx-auto px-4">
        <Hero 
        onDescubrirTalla={()=>setMostrarFormulario(true)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {vestidos.map((vestido) => (
            <div key={vestido.id} className="bg-white rounded-xl p-4 shadow">

              <img src={vestido.imagen} className='w-full pb-3'/>
              <h2 className="text-xl font-bold">
                {vestido.nombre}
              </h2>

              <p>S/ {vestido.precio}</p>

              <p>{vestido.descripcion}</p>

              <button
              onClick={() => {
                setVestidoSeleccionado(vestido);
                setMostrarModal(true);
              }}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
            >
              Elegir vestido
            </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de selección de vestido */}
{mostrarModal && vestidoSeleccionado && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    {/* Contenedor principal del modal */}
    <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">

      {/* Botón cerrar */}
      <button
        onClick={() => setMostrarModal(false)}
        className="absolute top-4 right-5 text-gray-500 hover:text-pink-600 text-3xl"
      >
        &times;
      </button>

      {/* Dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">

        {/* Columna izquierda: información del vestido */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">

          <img
            src={vestidoSeleccionado.imagen}
            alt={vestidoSeleccionado.nombre}
            className="w-full rounded-xl"
          />

          <h3 className="text-xl font-semibold mt-4 text-gray-800">
            {vestidoSeleccionado.nombre}
          </h3>

          <p className="text-pink-600 font-bold text-lg mt-2">
            S/ {vestidoSeleccionado.precio}
          </p>

          <p className="text-gray-500 text-center mt-2">
            {vestidoSeleccionado.descripcion}
          </p>

        </div>

        {/* Columna derecha: formulario */}
        <div className="md:col-span-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Encuentra tu talla
          </h2>

          <p className="text-gray-500 mb-2">
            Ingresa tus medidas para descubrir qué talla te recomendamos.
          </p>

          <SizeForm vestidoSeleccionado={vestidoSeleccionado} />

        </div>

      </div>

    </div>

  </div>
)}  


     {/*mostrarformulario && <SizeForm />*/}
     {mostrarformulario && (
        <SizeForm vestidoSeleccionado={vestidoSeleccionado} />
      )}
    </div>
  );
}

export default App;
