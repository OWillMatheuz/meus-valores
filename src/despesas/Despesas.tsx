import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Despesas.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

interface Despesa {
  gasolina: string;
  oleo: string;
  outrosGastos: string;
  alimentacao: string;
}

interface HistoricoDespesa extends Despesa {
  total: number;
  data: string;
}

const Despesas = () => {
  const [despesa, setDespesa] = useState<Despesa>({
    gasolina: "",
    oleo: "",
    outrosGastos: "",
    alimentacao: "",
  });

  const [total, setTotal] = useState(0);
  const [historicoDespesa, setHistoricoDespesa] = useState<HistoricoDespesa[]>(
    []
  );

  useEffect(() => {
    const historicoDespesa = localStorage.getItem("historicoDespesa");

    if (historicoDespesa) {
      setHistoricoDespesa(JSON.parse(historicoDespesa));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("historicoDespesa", JSON.stringify(historicoDespesa));
  }, [historicoDespesa]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { gasolina, oleo, outrosGastos, alimentacao } = despesa;
    const despesaTotal =
      parseFloat(gasolina || '0') +
      parseFloat(oleo || '0') +
      parseFloat(outrosGastos || '0') +
      parseFloat(alimentacao || '0');
    setTotal(parseFloat(despesaTotal.toFixed(2)));
    const novaDespesa: HistoricoDespesa = {
      ...despesa,
      total: despesaTotal,
      data: new Date().toLocaleDateString(),
    };

    // Adicione as despesas atuais ao histórico
    setHistoricoDespesa((prevState) => [...prevState, novaDespesa]);

    // Limpa os campos de despesa após adicionar ao histórico
    setDespesa({
      gasolina: "",
      oleo: "",
      outrosGastos: "",
      alimentacao: "",
    });
    toast.success("Despesa registrada com sucesso!");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDespesa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (index: number) => {
    const novaListaDespesas = [...historicoDespesa];
    novaListaDespesas.splice(index, 1);
    setHistoricoDespesa(novaListaDespesas);
    toast.success("Despesa excluída com sucesso!");
  };

  return (
    <div className="despesas-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Link to="/">
          <button className="voltar-botao">
            Voltar para a Página Principal
          </button>
        </Link>
        <div className="form-group-des">
          <label htmlFor="gasolina">Gasolina:</label>
          <input
            type="number"
            name="gasolina"
            id="gasolina"
            value={despesa.gasolina}
            onChange={handleChange}
            className="gasolina-input"
            placeholder="0,00"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group-des">
          <label htmlFor="oleo">Óleo:</label>
          <input
            type="number"
            name="oleo"
            id="oleo"
            value={despesa.oleo}
            onChange={handleChange}
            className="oleo-input"
            placeholder="0,00"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group-des">
          <label htmlFor="outrosGastos">Outros Gastos:</label>
          <input
            type="number"
            name="outrosGastos"
            id="outrosGastos"
            value={despesa.outrosGastos}
            onChange={handleChange}
            className="outros-gastos-input"
            placeholder="0,00"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group-des">
          <label htmlFor="alimentacao">Alimentação:</label>
          <input
            type="number"
            name="alimentacao"
            id="alimentacao"
            value={despesa.alimentacao}
            onChange={handleChange}
            className="alimentacao-input"
            placeholder="0,00"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group-des">
          <input
            type="submit"
            value="Registrar Despesas"
            className="registrar-botao"
          />
        </div>
      </form>

      <div className="historico-despesas-container">
        <h2>Histórico de Despesas</h2>
        <div className="historico-tabela-his">
          <table className="historico-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Gasolina</th>
                <th>Óleo</th>
                <th>Outros Gastos</th>
                <th>Alimentação</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {historicoDespesa.map((item, index) => (
                <tr key={index}>
                  <td>{item.data}</td>
                  <td>R$ {item.gasolina}</td>
                  <td>R$ {item.oleo}</td>
                  <td>R$ {item.outrosGastos}</td>
                  <td>R$ {item.alimentacao}</td>
                  <td>R$ {item.total.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className="apagar-botao-historico"
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Despesas;
