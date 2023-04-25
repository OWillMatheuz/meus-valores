import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  Key,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import "./Metas.css";
interface Meta {
  id: number;
  valor: number;
  meta: number; // novo campo
}

function Metas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [meta, setMeta] = useState<number>(0);
  const [contador, setContador] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [metaTotal, setMetaTotal] = useState<number>(0);

  useEffect(() => {
    const metasSalvas = localStorage.getItem("metas");
    const valorTotalSalvo = localStorage.getItem("valorTotal");

    if (metasSalvas) {
      setMetas(JSON.parse(metasSalvas));
      setContador(JSON.parse(metasSalvas).length);
    }

    if (valorTotalSalvo) {
      setValorTotal(Number(valorTotalSalvo));
    }
  }, []);

  function cadastrarMeta() {
    const novaMeta = { id: contador, valor: meta, meta: meta };
    const novasMetas = [...metas, novaMeta];
    setMetas(novasMetas);
    setMeta(0);
    setContador(contador + 1);
    localStorage.setItem("metas", JSON.stringify(novasMetas));
  }

  function atualizarMeta() {
    const indiceMeta = metas.length - 1;
    const novasMetas = [...metas];
    novasMetas[indiceMeta].valor = meta;
    novasMetas[indiceMeta].meta = meta; // novo campo
    setMetas(novasMetas);
    setMeta(0);
    localStorage.setItem("metas", JSON.stringify(novasMetas));
  }

  function deletarMeta(id: number) {
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
    localStorage.setItem("metas", JSON.stringify(novasMetas));
  }

  useEffect(() => {
    const metasSalvas = localStorage.getItem("metas");
    if (metasSalvas) {
      setMetas(JSON.parse(metasSalvas));
      setContador(JSON.parse(metasSalvas).length);
    }
  }, []);

  function handleMetaChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setMeta(Number(event.target.value));
  }

  useEffect(() => {
    const metaTotalCalculado = metas.reduce(
      (total, meta) => total + meta.valor,
      0
    );
    setMetaTotal(metaTotalCalculado);
  }, [metas]);

  const handleValorTotalChange = (e: { target: { value: any } }) => {
    setValorTotal(Number(e.target.value));
  };

  const metaRestante = metaTotal - valorTotal;

  return (
    <>
      <div className="metas-container">
        <div>
          <Link to="/registrar" className="btn-metas">
            Voltar para registros
          </Link>
        </div>
        <hr />
        <div>
        <h3>
          Suas Entregas:{" "}
          <span className="destaque">R$ {valorTotal.toFixed(2)}</span>
        </h3>
        <h3>
          Metas: <span className="destaque">R$ {metaTotal.toFixed(2)}</span>
        </h3>
        <h3>
          Falta pouco motoca:{" "}
          <span className="destaque">R$ {metaRestante.toFixed(2)}</span>
        </h3>
        </div>
        
        <hr />
        <p>Insira sua meta:</p>
        <input
          type="number"
          pattern="[0-9]*[.,]?[0-9]*"
          inputMode="decimal"
          value={meta}
          onChange={handleMetaChange}
        />
        <button onClick={cadastrarMeta}>Cadastrar</button>
        <button onClick={atualizarMeta}>Atualizar</button>
        <p>Sua meta atual é {metaTotal.toFixed(2)}</p>
        <h2>Histórico de metas cadastradas:</h2>
        <ul>
          {metas.map((meta) => (
            <li key={meta.id}>
              Meta: {meta.meta}
              <button
                className="btn-deletar"
                onClick={() => deletarMeta(meta.id)}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Metas;
function setMetaTotal(metaTotalCalculado: number) {
  throw new Error("Function not implemented.");
}

