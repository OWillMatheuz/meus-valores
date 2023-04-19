import { useState, useEffect } from "react";
import './Home.css'

function Home() {
  const [valorTotal, setValorTotal] = useState(0);
  const [valoresRegistrados, setValoresRegistrados] = useState<{ data: string; valor: number; km: number; descricao: string; }[]>([]);
  const [km, setKm] = useState(0);

  function handleKmChange(event: React.ChangeEvent<HTMLInputElement>) {
    const kmValue = parseFloat(event.target.value);
    setKm(kmValue);
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
    localStorage.setItem("valoresRegistrados", JSON.stringify(valoresRegistrados));
    localStorage.setItem("valorTotal", String(valorTotal));
  }, [valoresRegistrados, valorTotal]);

  function adicionarValor(valor: number, descricao: string) {
    const novaData = new Date().toLocaleDateString();
    const novoValor = { data: novaData, valor: valor, km: km, descricao: descricao };
    setValorTotal(valorTotal + valor);
    setValoresRegistrados([...valoresRegistrados, novoValor]);
  }

  function apagarValor(index: number) {
    const valorApagado = valoresRegistrados[index].valor;
    const valoresRestantes = valoresRegistrados.filter((_, i) => i !== index);
    setValorTotal(valorTotal - valorApagado);
    setValoresRegistrados(valoresRestantes);
  }

  function finalizarDia() {
    // TODO: enviar valores por email
  }

  return (
    <>
    
    <div className="container background-whatsapp">
    <h1>Minhas entregas</h1>
    <h3>Valor Total: <span className="destaque">R$ {valorTotal.toFixed(2)}</span></h3>
      <div>
        <h4>Neste campo coloque o Km de 1 ou 2 pedidos</h4>
        <p>Ex: 1 pedido 3,5 km | 2 pedidos 3,5 + 3,5 = 7 km</p>
        <p>E depois coloque o valor da entrega para enviar para o relatório</p>
        <hr />
        <label htmlFor="km">Km: </label>
        <input type="number" id="km-input" value={km} onChange={handleKmChange} />
      </div>
      <button onClick={() => adicionarValor(8.5, 'Valor de R$ 8,50')}><span>R$ 8,50</span></button>
      <button onClick={() => adicionarValor(15.5, 'Valor de R$ 15,50')}><span>R$ 15,50</span></button>
      <button onClick={() => adicionarValor(8.5, 'Retrabalho')}><span>Retrabalho</span></button>
      <div>
        {valoresRegistrados.map((valor, index) => (
          <div key={index}>
            <p>{valor.data} | R$ {valor.valor.toFixed(1)} | Km: {valor.km}</p>
            <button onClick={() => apagarValor(index)}>Apagar</button>
          </div>
        ))}
      </div>
      <button onClick={() => finalizarDia()}>Finalizar Dia</button>
    </div>
    </>
  );
}

export default Home
