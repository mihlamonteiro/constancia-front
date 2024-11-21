import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduto from './components/AddProduto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
