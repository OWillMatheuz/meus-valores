import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Historico.css";
import jsPDF from 'jspdf';


interface ValorRegistrado {
  id: number;
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
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  /* atualizar a pagina e nao mudar  */
  useEffect(() => {
    const handleScroll = () => {
      window.sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const valoresRegistrados = localStorage.getItem("valoresRegistrados");
    if (valoresRegistrados) {
      setValoresRegistrados(JSON.parse(valoresRegistrados));
    }

    // Restaurar a posição da página quando a página for carregada novamente
    const scrollPosition = window.sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

      /**/ 
  

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

  const entregas: { [key: string]: number } = {};
  const handleValorRegistrado = (valorRegistrado: ValorRegistrado) => {
    const novosValoresRegistrados = [...valoresRegistrados, valorRegistrado];
    setValoresRegistrados(novosValoresRegistrados);
    saveToLocalStorage(novosValoresRegistrados);

    if (!entregas[valorRegistrado.tipoEntrega]) {
      entregas[valorRegistrado.tipoEntrega] = 0;
    }

    entregas[valorRegistrado.tipoEntrega] += Number(valorRegistrado.valor);
  };
  const addValorRegistrado = (valorRegistrado: ValorRegistrado) => {
    const novosValoresRegistrados = [...valoresRegistrados, valorRegistrado];
    saveToLocalStorage(novosValoresRegistrados);
  };
  const getTotaisEntrega = () => {
    const totais: { [entrega: string]: number } = {};
    valoresRegistrados.forEach((valor) => {
      const entrega = valor.tipoEntrega;
      const valorEntrega = Number(valor.valor);
      totais[entrega] = (totais[entrega] ?? 0) + valorEntrega;
    });
    return totais;
  };
  const handleDelete = (index: number) => {
    const updatedValoresRegistrados = [...valoresRegistrados];
    updatedValoresRegistrados.splice(index, 1);
    setValoresRegistrados(updatedValoresRegistrados);
    setCurrentKeyIndex(currentKeyIndex + 1);
    saveToLocalStorage(updatedValoresRegistrados);
  };

  const [currentKeyIndex, setCurrentKeyIndex] = useState<number>(0);

  /* total de entregas*/
  const getTotalEntregas = () => {
    const entregas: string[] = [];
    for (let i = 0; i < valoresRegistrados.length; i++) {
      if (!entregas.includes(valoresRegistrados[i].tipoEntrega)) {
        entregas.push(valoresRegistrados[i].tipoEntrega);
      }
    }
    return entregas.length;
  };

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
const downloadButton = document.getElementById('download-pdf');
if (downloadButton) {
  downloadButton.addEventListener('click', function() {
    // Crie um novo objeto jsPDF
    const doc = new jsPDF();
    // Resto do código...
  });
}






  return (
    <>
      <div className="container background-whatsapp">
        <Link to="/">
          <button className="botao-azul-escuro">
            Voltar para a Página Principal
          </button>
        </Link>
        <h1>Histórico de entregas</h1>
        {Object.entries(getTotaisEntrega).map(([entrega, total]) => (
          <div key={entrega} className="form-group">
            <label htmlFor={`total-valor-${entrega}`}>
              Total de {entrega}:{" "}
            </label>
            <span id={`total-valor-${entrega}`}>{total.toFixed(2)}</span>
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="total-valor">Total de valor: </label>
          <span id="total-valor">{getTotalValor()}</span>
        </div>
        <div className="form-group">
          <label htmlFor="total-km">Total de km: </label>
          <span id="total-km">{getTotalKm()}</span>
        </div>
        <div className="form-group">
          <label htmlFor="total-entregas">Total de saídas: </label>
          <span id="total-entregas">{getTotalEntregas()}</span>
        </div>
        <div className="custom-box">
        <table >
          <thead>
            <tr>
              <th>Valor</th>
              <th>Km</th>
              <th>Data</th>
              <th>Entrega</th>
            </tr>
          </thead>
          <tbody>
            {filteredValoresRegistrados.map((valor, index) => (
              <tr key={index}>
                <td>{valor.descricao}</td>
                <td>{valor.km}</td>
                <td>{valor.data}</td>
                <td>{valor.tipoEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <button id="download-pdf">Baixar PDF</button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="botao-voltar-ao-topo"
        >
          <i className="fas fa-chevron-up"></i>Voltar ao topo
        </button>
      </div>
    </>
  );
}

export default Historico;
