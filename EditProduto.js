import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import FormInput from './FormInput';

export default function EditProduto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    categoria: '',
    marca: '',
    ncm: '',
    cfop: '',
    estoque: '',
    produtoTipo: '',
    preco: '',
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axiosInstance.get(`/produtos/${codigo}`);
        setProduto(response.data);
      } catch (error) {
        if (error.response) {
          setErro(`Erro ao buscar produto: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          setErro('Erro ao buscar produto: Nenhuma resposta recebida do servidor. Verifique sua conexão.');
        } else {
          setErro(`Erro ao buscar produto: ${error.message}`);
        }
      }
    };
    fetchProduto();
  }, [codigo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const atualizarProduto = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/produtos/${codigo}`, produto);
      alert('Produto atualizado com sucesso!');
      navigate('/list-produtos');
    } catch (error) {
      if (error.response) {
        setErro(`Erro ao atualizar o produto: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setErro('Erro ao atualizar o produto: Nenhuma resposta recebida do servidor. Verifique sua conexão.');
      } else {
        setErro(`Erro ao atualizar o produto: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Produto</h2>
      <form onSubmit={atualizarProduto}>
        <h3>Dados do Produto</h3>
        <FormInput id="categoria" label="Categoria" name="categoria" value={produto.categoria} onChange={handleInputChange} required />
        <FormInput id="marca" label="Marca" name="marca" value={produto.marca} onChange={handleInputChange} required />
        <FormInput id="ncm" label="NCM" name="ncm" value={produto.ncm} onChange={handleInputChange} required />
        <FormInput id="cfop" label="CFOP" name="cfop" value={produto.cfop} onChange={handleInputChange} required />
        <FormInput id="estoque" label="Estoque" name="estoque" type="number" value={produto.estoque} onChange={handleInputChange} required />
        <FormInput id="produtoTipo" label="Tipo de Produto" name="produtoTipo" type="number" value={produto.produtoTipo} onChange={handleInputChange} required />
        <FormInput id="preco" label="Preço" name="preco" type="number" value={produto.preco} onChange={handleInputChange} required />
        {erro && <div className="alert alert-danger mt-3">{erro}</div>}
        <button type="submit" className="btn btn-primary btn-lg mt-3">Atualizar Produto</button>
      </form>
    </div>
  );
}
