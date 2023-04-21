import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PaginaPrincipal.css";

function PaginaPrincipal() {
  useEffect(() => {
    document.body.classList.add("fundo-gradiente");
    return () => {
      document.body.classList.remove("fundo-gradiente");
    };
  }, []);

  return (
    <>
      <h1 className="titulo">Bem-vindo!</h1>
      <h2 className="subtitulo">O que você deseja fazer?</h2>
      <div className="botoes">
        <Link to="/registrar">
          <button className="botao">Registrar valores e km</button>
        </Link>
        <Link to="/historico">
          <button className="botao">Ver histórico</button>
        </Link>
        <Link to="/metas">
          <button className="botao">Definir metas</button>
        </Link>
      </div>
    </>
  );
}

export default PaginaPrincipal;
