import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import './App.css';
import Historico from './paginas/historico/Historico';
import PaginaPrincipal from './paginas/principal/PaginaPrincipal';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/registrar" element={<Home />} />
      <Route  path="/" element={<PaginaPrincipal />} />
      <Route  path="/home" element={<PaginaPrincipal />} />
      <Route path="/historico" element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
