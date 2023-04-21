import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Historico.css";

interface ValorRegistrado {
  descricao: string;
  km: string;
  valor: string;
  data: string;
  tipoEntrega: string;
}

function Historico() {
  const [valoresRegistrados, setValoresRegistrados] = useState<
    ValorRegistrado[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filteredValoresRegistrados, setFilteredValoresRegistrados] = useState<
    ValorRegistrado[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [kmTotal, setKmTotal] = useState<number>(0);

  useEffect(() => {
    const valoresRegistrados = localStorage.getItem("valoresRegistrados");
    if (valoresRegistrados) {
      setValoresRegistrados(JSON.parse(valoresRegistrados));
    }
  }, []);

  const getTotalKm = () => {
    let total = 0;
    for (let i = 0; i < valoresRegistrados.length; i++) {
      total += Number(valoresRegistrados[i].km);
    }
    return total.toFixed(2);
  };

  const saveToLocalStorage = (valoresRegistrados: ValorRegistrado[]) => {
    localStorage.setItem(
      "valoresRegistrados",
      JSON.stringify(valoresRegistrados)
    );
    setKmTotal(Number(getTotalKm()));
  };

  const getTotalValor = () => {
    let total = 0;
    for (let i = 0; i < valoresRegistrados.length; i++) {
      total += Number(valoresRegistrados[i].valor);
    }
    return total.toFixed(2);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    if (selectedDate) {
      setFilteredValoresRegistrados(
        valoresRegistrados.filter((valor) => valor.data === selectedDate)
      );
    } else {
      setFilteredValoresRegistrados(valoresRegistrados);
    }
  }, [valoresRegistrados, selectedDate]);

  useEffect(() => {
    const kmRegistrados = valoresRegistrados.reduce(
      (total, valor) => total + Number(valor.km),
      0
    );
    setKmTotal(kmRegistrados);
  }, [valoresRegistrados]);

  return (
    <>
      <div className="container background-whatsapp">
        <Link to="/">
          <button>Voltar para a Página Principal</button>
        </Link>
        <h1>Histórico de entregas</h1>
        <div className="form-group">
          <label htmlFor="total-valor">Total de valor: </label>
          <span id="total-valor">{getTotalValor()}</span>
        </div>
        <div className="form-group">
          <label htmlFor="total-km">Total de km: </label>
          <span id="total-km">{getTotalKm()}</span>
        </div>

        <div className="form-group">
          <label htmlFor="date-picker">Selecione uma data: </label>
          <input
            type="date"
            id="date-picker"
            name="date-picker"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Km</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredValoresRegistrados.map((valor, index) => (
              <tr key={index}>
                <td>{valor.descricao}</td>
                <td>{valor.km}</td>
                <td>{valor.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="fas fa-chevron-up">Voltar ao topo</i>
        </button>
      </div>
    </>
  );
}

export default Historico;
