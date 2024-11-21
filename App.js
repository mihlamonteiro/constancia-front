import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduto from './components/AddProduto';
import ListProduto from './components/ListProduto';
import EditProduto from './components/EditProduto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProduto />} />
        <Route path="/list-produtos" element={<ListProduto />} />
        <Route path="/edit-produto/:codigo" element={<EditProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
