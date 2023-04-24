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
      <div className="bg-svg">
        <h1 className="titulo">Salve Motoca!</h1>
        <h2 className="subtitulo">O que você deseja fazer?</h2>
        <div className="botoes row">
  <div className="col-sm-6 col-md-6 col-lg-6">
    <Link to="/registrar">
      <img
        src="https://tinypic.host/images/2023/04/22/icons8-editar-propriedade-64.png"
        alt="Icone 1"
        className="icone"
      />
      <p className="texto-botao">Registrar valores e km</p>
    </Link>
  </div>
  <div className="col-sm-6 col-md-6 col-lg-6">
    <Link to="/historico">
      <img
        src="https://tinypic.host/images/2023/04/22/icons8-historico-de-encomendas-100.png"
        alt="Icone 2"
        className="icone"
      />
      <p className="texto-botao">Ver histórico</p>
    </Link>
  </div>
  <div className="col-sm-6 col-md-6 col-lg-6">
    <Link to="/metas">
      <img
        src="https://tinypic.host/images/2023/04/22/icons8-objetivo-100.png"
        alt="Icone 3"
        className="icone"
      />
      <p className="texto-botao">Definir metas</p>
    </Link>
  </div>
  <div className="col-sm-6 col-md-6 col-lg-6">
    <Link to="/km">
      <img
        src="https://tinypic.host/images/2023/04/24/icons8-velocimetro-50.png"
        alt="Icone 3"
        className="icone"
      />
      <p className="texto-botao">Troca de óleo</p>
    </Link>
  </div>
</div>

        <div className="bg-svg-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff5500"
              fill-opacity="0.8"
              d="M0,96L480,160L960,32L1440,288L1440,320L960,320L480,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default PaginaPrincipal;
