import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import FormInput from '../components/FormInput';

export default function AddProduto() {
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
    const [errosCampos, setErrosCampos] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProduto({ ...produto, [id]: value });
        setErrosCampos({ ...errosCampos, [id]: '' }); // Limpa o erro do campo ao mudar o valor
    };

    const salvarProduto = async (e) => {
        e.preventDefault();
        const novosErros = {};
        Object.entries(produto).forEach(([key, value]) => {
            if (!value && key !== 'ncm' && key !== 'cfop') { // NCM e CFOP são opcionais
                novosErros[key] = `O campo ${key} é obrigatório.`;
            }
        });

        if (Object.keys(novosErros).length > 0) {
            setErrosCampos(novosErros);
            setErro('Por favor, corrija os erros nos campos antes de continuar.');
            return;
        }

        // Converter campos numéricos para o tipo correto antes do envio
        const produtoParaEnvio = {
            ...produto,
            estoque: parseInt(produto.estoque, 10),
            produtoTipo: parseInt(produto.produtoTipo, 10),
            preco: parseFloat(produto.preco),
        };

        try {
            const response = await axiosInstance.post('/produtos', produtoParaEnvio);
            alert('Produto adicionado com sucesso!');
            navigate('/list-produtos');
        } catch (error) {
            if (error.response) {
                setErro(`Erro ao salvar o produto: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                setErro('Erro ao salvar o produto: Nenhuma resposta recebida do servidor. Verifique sua conexão.');
            } else {
                setErro(`Erro ao salvar o produto: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Produto</h2>
            <form onSubmit={salvarProduto}>
                <h3>Dados do Produto</h3>
                <FormInput id="categoria" label="Categoria" value={produto.categoria} onChange={handleInputChange} required errorMessage={errosCampos.categoria} />
                <FormInput id="marca" label="Marca" value={produto.marca} onChange={handleInputChange} required errorMessage={errosCampos.marca} />
                <FormInput id="ncm" label="NCM" value={produto.ncm} onChange={handleInputChange} errorMessage={errosCampos.ncm} />
                <FormInput id="cfop" label="CFOP" value={produto.cfop} onChange={handleInputChange} errorMessage={errosCampos.cfop} />
                <FormInput id="estoque" label="Estoque" type="number" value={produto.estoque} onChange={handleInputChange} required errorMessage={errosCampos.estoque} />
                <FormInput id="produtoTipo" label="Tipo de Produto" type="number" value={produto.produtoTipo} onChange={handleInputChange} required errorMessage={errosCampos.produtoTipo} />
                <FormInput id="preco" label="Preço" type="number" step="0.01" value={produto.preco} onChange={handleInputChange} required errorMessage={errosCampos.preco} />
                {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                <button type="submit" className="btn btn-primary btn-lg mt-3">Adicionar Produto</button>
                </form>
            <button onClick={() => navigate('/list-produtos')} className="btn btn-secondary btn-lg mt-3">Listar Produtos</button>
        </div>
    );
}