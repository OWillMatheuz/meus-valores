import { SetStateAction, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "./TrocaDeOleoForm.css";

interface CalcHistoryItem {
  kmAtual: number;
  kmProximaTroca: number;
  kmFaltantes: number;
  data: string;
}

function TrocaDeOleoForm() {
  const [kmAtual, setKmAtual] = useState<number>(0);
  const [kmProximaTroca, setKmProximaTroca] = useState<number>(0);
  const [kmFaltantes, setKmFaltantes] = useState<number | null>(null);
  const [calcHistory, setCalcHistory] = useState<CalcHistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("calcHistory");
    if (storedHistory) {
      setCalcHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
  }, [calcHistory]);

  function handleKmAtualChange(event: { target: { value: string } }) {
    setKmAtual(Number(event.target.value));
  }

  function handleKmProximaTrocaChange(event: { target: { value: string } }) {
    setKmProximaTroca(Number(event.target.value));
  }

  function handleCalcularClick(event: { preventDefault: () => void }) {
    event.preventDefault();
    const kmFaltantes = kmProximaTroca - kmAtual;
    setKmFaltantes(kmFaltantes);
    const currentDate = new Date().toLocaleDateString();
    setCalcHistory([
      ...calcHistory,
      { kmAtual, kmProximaTroca, kmFaltantes, data: currentDate },
    ]);
  }

  function handleClearHistory() {
    setCalcHistory([]);
    localStorage.removeItem("calcHistory");
  }

  return (
    <>
    <div className="form-container">
      <form className="form-wrapper">
        <Link to="/" className="back-link custom-button">
          Voltar para a página inicial
        </Link>
        <h2 className="title-with-margin">Troca de Óleo</h2>
        <br />
        <label>
          Km da próxima troca de óleo: <br /> (Ex: Trocou o óleo com 10.000
          coloque aqui 11.000)
          <input
            type="number"
            value={kmProximaTroca}
            onChange={handleKmProximaTrocaChange}
            className="form-input"
          />
        </label>
        <label>
          Km atual do hodômetro: <br /> (Ex: Coloque o km atual)
          <input
            type="number"
            value={kmAtual}
            onChange={handleKmAtualChange}
            className="form-input"
          />
        </label>
        <br />
        <button onClick={handleCalcularClick} className="form-button">
          Calcular
        </button>
        <br />
        {kmFaltantes !== null && (
          <p className="form-result">
            Faltam {kmFaltantes} km para a próxima troca de óleo.
          </p>
        )}
      </form>
      <div className="history-container">
        <h2>Histórico</h2>
        <hr />
        <ul>
          {calcHistory.map((item, index) => (
            <li key={index}>
              Data: {item.data} Km Atual: {item.kmAtual} Km | Você tem até:{" "}
              {item.kmProximaTroca} Km pra trocar o óleo. <br /> <hr /> Faltam {item.kmFaltantes} Km pra você troca o óleo hein motoca !
            </li>
          ))}
        </ul>
        <button onClick={handleClearHistory} className="clear-history-button">
          Limpar Histórico
        </button>
      </div>
    </div>
    </>
  );
}

export default TrocaDeOleoForm;
