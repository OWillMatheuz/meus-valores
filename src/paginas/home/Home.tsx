import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import React from "react";
import datetime from "react";
import { ToastContainer, ToastContentProps, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ValorRegistrado {
  data: string;
  tipoEntrega: number;
  valor: number;
  km: number;
  descricao: string;
}

function Home(props: {
  atualizarValorTotal: (novoValorTotal: number) => void;
}) {
  const [historico, setHistorico] = useState<number[]>([]);
  const [valorAtual, setValorAtual] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [valoresRegistrados, setValoresRegistrados] = useState<
    ValorRegistrado[]
  >([]);
  const [km, setKm] = useState(0);
  const [exibirMensagem, setExibirMensagem] = useState(false);
  const [kmTotal, setKmTotal] = useState(0);
  // novo estado para controlar a exibição da mensagem

  function handleKmChange(event: React.ChangeEvent<HTMLInputElement>) {
    const kmValue = parseFloat(event.target.value);
    setKm(kmValue);
  }
  function mostrarMensagemSucesso(
    mensagem:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | ((props: ToastContentProps<unknown>) => React.ReactNode)
      | null
      | undefined
  ) {
    toast.success(mensagem, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  function adicionarValor(valor: number, descricao: string) {
    setKmTotal(kmTotal + valor);
    const novaData = new Date().toLocaleString();
    setMensagem(`Adicionado com sucesso: ${descricao} (${km} Km)`);
    mostrarMensagemSucesso(`Adicionado com sucesso: ${descricao} (${km} Km)`);
    const tipoEntrega = valoresRegistrados.length + 1;
    const novoValor = {
      data: novaData,
      valor: valor,
      km: km,
      descricao: descricao,
      tipoEntrega: tipoEntrega,
    };
    setValorTotal((prevValorTotal) => prevValorTotal + valor);
    setValoresRegistrados((prevValoresRegistrados) => [
      ...prevValoresRegistrados,
      novoValor,
    ]);
    if (descricao === "Retrabalho") {
      // verifica se a descrição é "Retrabalho"
      setExibirMensagem(true); // define o estado para exibir a mensagem
    }
  }

  useEffect(() => {
    const storedValores = localStorage.getItem("valoresRegistrados");
    const storedValorTotal = localStorage.getItem("valorTotal");
    if (storedValores) {
      setValoresRegistrados(JSON.parse(storedValores));
    }
    if (storedValorTotal) {
      setValorTotal(Number(storedValorTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "valoresRegistrados",
      JSON.stringify(valoresRegistrados)
    );
    localStorage.setItem("valorTotal", String(valorTotal));
  }, [valoresRegistrados, valorTotal]);

  useEffect(() => {
    const kmRegistrados = valoresRegistrados.reduce(
      (total, valor) => total + valor.km,
      0
    );
    setKmTotal(kmRegistrados);
  }, [valoresRegistrados]);

  function apagarValor(index: number) {
    const valorApagado = valoresRegistrados[index].valor;
    const valoresRestantes = valoresRegistrados.filter((_, i) => i !== index);
    setValorTotal((prevValorTotal) => prevValorTotal - valorApagado);
    setValoresRegistrados(valoresRestantes);
    toast.success("Valor apagado com sucesso!");
    
  }

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const kmRegistrados = valoresRegistrados.reduce(
      (total, valor) => total + valor.km,
      0
    );
    setKmTotal(kmRegistrados);
  }, [valoresRegistrados]);

  function atualizarValorTotal(valor: number) {
    setValorTotal(valorTotal + valor);
  }

  const [mensagem, setMensagem] = useState("");

  /* deletar todos os registros da minha lista */
  function handleDeleteAll() {
    confirmDelete();
  }

  function confirmDelete() {
    const response = window.confirm("Tem certeza que deseja deletar tudo?");
    if (response == true) {
      setValorTotal(0);
      setValoresRegistrados([]);
      localStorage.removeItem("valorTotal");
      localStorage.removeItem("valoresRegistrados");
      alert("Tudo foi deletado com sucesso!");
    } else {
      alert("Operação cancelada.");
    }
  }
  

  return (
    <>
      <div className="bg-svg">
        <div className="container background-whatsapp">
          <Link to="/">
            <button>Voltar para a Página Principal</button>
          </Link>
          <hr />
          <h1>Minhas entregas</h1>

          <div className="caixa">
            <h3>
              Valor Total:{" "}
              <span className="destaque">R$ {valorTotal.toFixed(2)}</span>
            </h3>
            <h3>
              Km Total:{" "}
              <span className="destaque">{kmTotal.toFixed(1)} km</span>
            </h3>
          </div>

          <hr />
          <div>
            <h4>Neste campo coloque o Km de 1 ou 2 pedidos</h4>
            <p>Ex: 1 pedido 3,5 km | 2 pedidos 3,5 + 3,5 = 7 km</p>
            <p>
              E depois coloque o valor da entrega para enviar para o relatório
            </p>
            <hr />
            <label htmlFor="km" className="destaque">
              Km:{" "}
            </label>
            <input
              type="number"
              id="km-input"
              step="any"
              value={km}
              onChange={handleKmChange}
              pattern="[0-9]*[.,]?[0-9]*"
              inputMode="decimal"
            />
          </div>
          <div>
            <button onClick={() => adicionarValor(8.5, "Valor de R$ 8,50")}>
              <span>R$ 8,50</span>
            </button>
            <button onClick={() => adicionarValor(15.5, "Valor de R$ 15,50")}>
              <span>R$ 15,50</span>
            </button>
            <button onClick={() => adicionarValor(8.5, "Retrabalho")}>
              <span>Retrabalho</span>
            </button>
            <ToastContainer />
          </div>
          <div>
            {valoresRegistrados.map((valor, index) => (
              <div key={index}>
                <p>
                  {valor.data} |{" "}
                  <span className="valor">{`R$ ${valor.valor.toFixed(
                    1
                  )}`}</span>{" "}
                  | Km: {valor.km} | {valor.descricao}
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Tem certeza que deseja apagar?")) {
                      apagarValor(index);
                    }
                  }}
                >
                  Apagar
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleDeleteAll} style={{ marginRight: "10px" }}>
            Deletar tudo
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-chevron-up">Voltar ao topo</i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
export type { ValorRegistrado };
