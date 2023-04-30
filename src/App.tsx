import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import './App.css';
import Historico from './paginas/historico/Historico';
import PaginaPrincipal from './paginas/principal/PaginaPrincipal';
import Metas from './paginas/metas/Metas';
import TrocaDeOleoForm from './paginas/trocadeoleo/TrocaDeOleoForm'
import Despesas from './despesas/Despesas';

function App() {
  const [valorTotal, setValorTotal] = useState(0);

  function atualizarValorTotal(novoValorTotal: number) {
    setValorTotal(novoValorTotal);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/home" element={<PaginaPrincipal />} />
        <Route path="/registrar" element={<Home atualizarValorTotal={atualizarValorTotal} />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/km" element={<TrocaDeOleoForm/>} />
        <Route path="/despesas" element={<Despesas/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
