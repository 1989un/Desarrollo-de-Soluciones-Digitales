import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css';
import Header from "./components/header";
import Hero from "./components/hero";
import SizeForm from "./components/sizeForm";

function App() {

  const [mostrarformulario,setMostrarFormulario]=useState(false);
  return (
    <div className="min-h-screen bg-pink-50">
      <Header/>
      <Hero 
      onDescubrirTalla={()=>setMostrarFormulario(true)}
      />

     {mostrarformulario && <SizeForm />}
    </div>
  );
}

export default App;
