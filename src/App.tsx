import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import Header from './Header';
import ListaProdutos from './ListaProdutos';
import Treinador from './Treinador';
import './Produtos.css'
import UpdateProduto from './UpdateProduto';

function App() {
  return (
    
    <Router>
      {/*/<Header />*/}
      <Routes>
        <Route path="/" element={<ListaProdutos />} />
        <Route path="/update" element={<UpdateProduto id={1}/>} />

        {/* Adicione mais rotas para outras páginas */}
        {/* Adicione mais rotas para outras páginas */}
      </Routes>
    </Router>
  );
}

export default App;
