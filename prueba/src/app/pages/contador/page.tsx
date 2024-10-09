'use client'
import "../../styles/estilos.sass";
import { SetStateAction, useState } from "react";

export default function ContadorFunc() {
  const [contador, setContador] = useState(0);
  const [primero, setPrimero] = useState(0); // Para almacenar el primer número
  const [segundo, setSegundo] = useState(0); // Para almacenar el segundo número
  const [operacion, setOperacion] = useState(''); // Para almacenar la operación pendiente
  const [resultado, setResultado] = useState(0); // Para almacenar el resultado final

  // Funciones que se activan al pulsar los botones de números
  const handleClickNumero = (numero: SetStateAction<number>) => {
    if (operacion === '') {
      setPrimero(numero); // Si no hay operación, almacena como primer número
    } else {
      setSegundo(numero); // Si ya hay una operación pendiente, almacena como segundo número
    }
  };

  // Función para activar la operación de suma
  const handleSuma = () => {
    setOperacion('sumar'); // Marca que la operación pendiente es una suma
  };

  // Función que se activa al pulsar el botón "="
  const handleResultado = () => {
    if (operacion === 'sumar' && primero !== 0 && segundo !== 0) {
      const suma = primero + segundo; // Realiza la suma
      setResultado(suma); // Almacena el resultado
    }
  }

  const recorrido = () => {
    setContador((prev) => prev + 1);
  };

  const recorrido_restando = () => {
    setContador((prev) => prev - 1);
  };

  const limpiado = () => {
    setContador(0);
    setResultado(0)
  };


  return (
    <div className="xd">
      <div className="xd2">
        <button onClick={recorrido}>Sumar</button>
        <button onClick={recorrido_restando}>Restar</button>
        <button onClick={limpiado}>Limpiar</button>
        <button onClick={() => handleClickNumero(1)}>1</button>
        <button onClick={() => handleClickNumero(2)}>2</button>
        <button onClick={handleSuma}>+</button>
        <button onClick={handleResultado}>=</button>
      </div>
      <h1 className="xd3">{contador}</h1>
      <h2 className="xd3">{resultado}</h2>
      <a href="../../">Back</a>
    </div>
  );
}
