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
      <div className="titulo-container">
  <h1 className="titulo">Salve Motoca!</h1>
  <img className="icone-money" src="https://media.giphy.com/media/Qze6gDuxZt48U/giphy.gif" alt="dinheiro"></img>
</div>
        <h2 className="subtitulo">O que você deseja fazer?</h2>
        <div className="botoes">
          <div className="row">
            <div className="col-md-6">
              <Link to="/registrar" className="botao">
                <img
                  src="https://tinypic.host/images/2023/04/22/icons8-editar-propriedade-64.png"
                  alt="Icone 1"
                  className="icone"
                />
                <p className="texto-botao">Registrar valores e km</p>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/historico" className="botao">
                <img
                  src="https://tinypic.host/images/2023/04/22/icons8-historico-de-encomendas-100.png"
                  alt="Icone 2"
                  className="icone"
                />
                <p className="texto-botao">Ver histórico</p>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/metas" className="botao">
                <img
                  src="https://tinypic.host/images/2023/04/22/icons8-objetivo-100.png"
                  alt="Icone 3"
                  className="icone"
                />
                <p className="texto-botao">Definir metas</p>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/km" className="botao">
                <img
                  src="https://tinypic.host/images/2023/04/25/icons8-velocimetro-64.png"
                  alt="Icone 4"
                  className="icone"
                />
                <p className="texto-botao">Troca de óleo</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default PaginaPrincipal;