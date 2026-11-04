import { useState } from "react";
import InputMedida from "./InputMedida";


function sizeForm({vestidoSeleccionado }) {
  const [altura, setAltura] = useState("");
  const [busto, setBusto] = useState("");
  const [cintura, setCintura] = useState("");
  const [cadera, setCadera] = useState("");

  const[tallaRecomendada,setTallaRecomendada]=useState("");
  const[error,setError]=useState("");


  const camposMedidas = [
  {
    nombre: "altura",
    label: "Altura (cm)",
    placeholder: "Ej. 160",
    value: altura,
    onChange: (e) => {
      setAltura(e.target.value);
      setError("");
    },
  },
  {
    nombre: "busto",
    label: "Busto (cm)",
    placeholder: "Ej. 90",
    value: busto,
    onChange: (e) => {
      setBusto(e.target.value);
      setError("");
    },
  },
  {
    nombre: "cintura",
    label: "Cintura (cm)",
    placeholder: "Ej. 72",
    value: cintura,
    onChange: (e) => {
      setCintura(e.target.value);
      setError("");
    },
  },
  {
    nombre: "cadera",
    label: "Cadera (cm)",
    placeholder: "Ej. 98",
    value: cadera,
    onChange: (e) => {
      setCadera(e.target.value);
      setError("");
    },
  },
];


const tablaTallas = vestidoSeleccionado.tablaTallas;
{/*console.log("Tabla de tallas:", tablaTallas);*/}

const [mensajeAltura, setMensajeAltura] = useState("");

function calcularTalla(){

     // Limpiamos los mensajes anteriores
      setError("");
      setTallaRecomendada("");

    if(!altura || !busto || !cintura|| !cadera){
       setError("Por favor, completa todas las medidas.");
    return;
    }

   
    const medidaAltura=Number(altura);
    const medidaBusto=Number(busto);
    const medidaCintura=Number(cintura);
    const medidaCadera=Number(cadera);

    if(!Number.isFinite(medidaAltura) || 
      !Number.isFinite(medidaBusto) || 
      !Number.isFinite(medidaCintura) || 
      !Number.isFinite(medidaCadera) ||
        medidaAltura <= 0 ||
        medidaBusto <= 0 ||
        medidaCintura <= 0 ||
        medidaCadera <= 0
    ){
       setError("Ingresa medidas numéricas mayores que cero.");
      return;
    }

    const tallaEncontrada = tablaTallas.find(
      (talla) =>
        medidaBusto <= talla.busto &&
        medidaCintura <= talla.cintura &&
        medidaCadera <= talla.cadera
    );

    if (tallaEncontrada) {
      setTallaRecomendada(tallaEncontrada.talla);
    } else {
      setTallaRecomendada("XL");
    }

    if (Number(altura) < 155) {
      setMensajeAltura("Te recomendamos revisar el largo del vestido.");
    } else {
      setMensajeAltura("Revisa las medidas de largo del vestido antes de comprar.");
    }
  }

  function limpiarFormulario(){
    setAltura("");
    setBusto("");
    setCintura("");
    setCadera("");
    setTallaRecomendada("");
    setError("");
    setMensajeAltura("");
  }






  return (
    <section >
      <h2 className="text-1xl font-bold text-purple-700">
        Descubre tu talla ideal
      </h2>

      <p className="mt-2 text-gray-600">
        Ingresa tus medidas en centímetros.
      </p>

     <form
  onSubmit={(e) => {
    e.preventDefault();
    calcularTalla();
  }}
>
         {/* Generamos los cuatro campos con map */}
         <div className="grid grid-cols-2 gap-4 my-4">
          {camposMedidas.map((campo) => (
            <InputMedida
              key={campo.nombre}
              label={campo.label}
              value={campo.value}
              onChange={campo.onChange}
              placeholder={campo.placeholder}
            />
          ))
          }
           </div>
        

        <button 
          type="submit"
          className="mb-2 w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Calcular mi talla
        </button>

       
        {error && (
          <p className="rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

         {/* Resultado de la talla */}
        {
          tallaRecomendada && (
             <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
              <p className="text-gray-600">
                Tu talla recomendada es:
              </p>

              <p className="mt-2 text-5xl font-bold text-purple-700">
                {tallaRecomendada}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Esta recomendación es una referencia basada en tus medidas.
              </p>

              <p className="mt-2 text-sm text-purple-600">
                {mensajeAltura}
              </p>


              <button type="button" onClick={limpiarFormulario}
              className="mt-4 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700">
                Volver a Calcular
              </button>
            </div>
          )
        }
      </form>
    </section>
  );
}

export default sizeForm;