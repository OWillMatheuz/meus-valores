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
      <div className="container">
        <h1 className="titulo">Salve Motoca!</h1>
        <h2 className="subtitulo">O que você deseja fazer?</h2>
        <div className="botoes">
          <div className="row">
            <div className="col-md-6">
              <a href="/registrar">
                <div className="botao">
                  <img
                    src="https://tinypic.host/images/2023/04/22/icons8-editar-propriedade-64.png"
                    alt="Icone 1"
                    className="icone"
                  />
                  <p className="texto-botao">Registrar valores e km</p>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="/historico">
                <div className="botao">
                  <img
                    src="https://tinypic.host/images/2023/04/22/icons8-historico-de-encomendas-100.png"
                    alt="Icone 2"
                    className="icone"
                  />
                  <p className="texto-botao">Ver histórico</p>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="/metas">
                <div className="botao">
                  <img
                    src="https://tinypic.host/images/2023/04/22/icons8-objetivo-100.png"
                    alt="Icone 3"
                    className="icone"
                  />
                  <p className="texto-botao">Definir metas</p>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="/km">
                <div className="botao">
                  <img
                    src="https://tinypic.host/images/2023/04/22/icons8-objetivo-100.png"
                    alt="Icone 4"
                    className="icone"
                  />
                  <p className="texto-botao">Troca de óleo</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaPrincipal;
