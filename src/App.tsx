import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import ListaProdutos from './ListaProdutos';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListaProdutos />} />

        {/* Adicione mais rotas para outras páginas */}
        {/* Adicione mais rotas para outras páginas */}
      </Routes>
    </Router>
  );
}

export default App;
