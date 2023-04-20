import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import './App.css';
import Historico from './paginas/historico/Historico';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/home" element={<Home />} />
      <Route path="/historico" element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
