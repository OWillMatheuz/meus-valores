import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import "./TrocaDeOleoForm.css";
import React from "react";

function TrocaDeOleoForm() {
    const [kmAtual, setKmAtual] = useState<number>(0);
    const [kmProximaTroca, setKmProximaTroca] = useState<number>(0);
    const [kmFaltantes, setKmFaltantes] = useState<string>("");
    function handleKmAtualChange(event: { target: { value: string; }; }) {
        setKmAtual(Number(event.target.value));
      }
      
      function handleKmProximaTrocaChange(event: { target: { value: string; }; }) {
        setKmProximaTroca(Number(event.target.value));
      }

      function handleCalcularClick(event: { preventDefault: () => void; }) {
  event.preventDefault();
  const kmFaltantes = kmProximaTroca - kmAtual;
  setKmFaltantes(String(kmFaltantes));
}

      
    return (
      <form>
        <label>
          Km atual do hodômetro:
          <input type="number" value={kmAtual} onChange={(e) => setKmAtual(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Km da próxima troca de óleo:
          <input type="number" value={kmProximaTroca} onChange={(e) => setKmProximaTroca(Number(e.target.value))} />
        </label>
        <br />
        <button onClick={handleCalcularClick}>Calcular</button>
        <br />
        {kmFaltantes !== null && (
          <p>
            Faltam {kmFaltantes} km para a próxima troca de óleo.
          </p>
        )}
      </form>
    );
  }
  export default TrocaDeOleoForm;