import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const valoresRegistrados = localStorage.getItem("valoresRegistrados");
    if (valoresRegistrados) {
      setValoresRegistrados(JSON.parse(valoresRegistrados));
    }
  }, []);

  const getTotalValor = () => {
    let total = 0;
    for (let i = 0; i < valoresRegistrados.length; i++) {
      total += Number(valoresRegistrados[i].valor);
    }
    return total.toFixed(2);
  };

  return (
    <>
      <div className="container background-whatsapp">
      <Link to="/">
          <button>Voltar para Home</button>
        </Link>
        <h1>Histórico de entregas</h1>
        <div className="form-group">
          <label htmlFor="total-valor">Total de valor: </label>
          <span id="total-valor">{getTotalValor()}</span>
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
            {valoresRegistrados.map((valor, index) => (
              <tr key={index}>
                <td>{valor.descricao}</td>
                <td>{valor.km}</td>
                <td>{valor.data}</td>
              </tr>
            ))}
          </tbody>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="fas fa-chevron-up">Voltar ao topo</i>
        </button>
        </table>

      </div>
    </>
  );
}

export default Historico;
