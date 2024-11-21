import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

function ListProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [criterioBusca, setCriterioBusca] = useState('categoria');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axiosInstance.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        if (error.response) {
          setErro(`Erro ao buscar produtos: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          setErro('Erro ao bucar produtos: Nenhuma resposta recebida do servidor. Verifique sua conexão.');
        } else {
          setErro(`Erro ao buscar produtos: ${error.message}`);
        }
      }
    };
    fetchProdutos();
  }, []);

  const editarProduto = (codigo) => {
    navigate(`/edit-produto/${codigo}`);
  };

  const deletarProduto = async (codigo) => {
    try {
      await axiosInstance.delete(`/produtos/${codigo}`);
      alert('Produto deletado com sucesso!');
      setProdutos(produtos.filter((produto) => produto.codigo !== codigo));
    } catch (error) {
      if (error.response) {
        setErro(`Erro ao deletar produto: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setErro('Erro ao deletar produto: Nenhuma resposta recebida do servidor. Verifique sua conexão.');
      } else {
        setErro(`Erro ao deletar produto: ${error.message}`);
      }
    }
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  const handleCriterioChange = (e) => {
    setCriterioBusca(e.target.value);
  };

  const produtosFiltrados = produtos.filter((produto) => {
    switch (criterioBusca) {
      case 'codigo':
        return produto.codigo.toString().includes(busca);
      case 'categoria':
        return produto.categoria.toLowerCase().includes(busca.toLowerCase());
      case 'marca':
        return produto.marca.toLowerCase().includes(busca.toLowerCase());
      case 'ncm':
        return produto.ncm.toLowerCase().includes(busca.toLowerCase());
      case 'cfop':
        return produto.cfop.toLowerCase().includes(busca.toLowerCase());
      default:
        return false;
    }
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Produtos</h2>
      <div className="form-group">
        <select className="form-control mb-2" value={criterioBusca} onChange={handleCriterioChange}>
          <option value="codigo">Código</option>
          <option value="categoria">Categoria</option>
          <option value="marca">Marca</option>
          <option value="ncm">NCM</option>
          <option value="cfop">CFOP</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder={`Buscar por ${criterioBusca}`}
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>
      {erro && <div className="alert alert-danger mt-3">{erro}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Código</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>NCM</th>
            <th>CFOP</th>
            <th>Estoque</th>
            <th>Tipo de Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.categoria}</td>
              <td>{produto.marca}</td>
              <td>{produto.ncm}</td>
              <td>{produto.cfop}</td>
              <td>{produto.estoque}</td>
              <td>{produto.produtoTipo}</td>
              <td>{produto.preco}</td>
              <td>
                <button onClick={() => editarProduto(produto.codigo)} className="btn btn-warning mr-2">Editar</button>
                <button onClick={() => deletarProduto(produto.codigo)} className="btn btn-danger">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduto;
