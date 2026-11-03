function hero({onDescubrirTalla}){
    return(
        <main className="flex flex-col justify-center items-center px-6 py-20 text-center">
            <h2 className="max-w-3xl text-5xl font-bold text-gray-800">
                Encuentra tu talla ideal sin complicaciones
            </h2>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
                Descubre prendas que se ajustan a tu cuerpo.
                Nuestra tecnología te ayuda a elegir la talla perfecta.
            </p>

            <button onClick={onDescubrirTalla} className="mt-8 rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700">
                Descubrir mi talla
            </button>
        </main>
    );
}

export default hero;