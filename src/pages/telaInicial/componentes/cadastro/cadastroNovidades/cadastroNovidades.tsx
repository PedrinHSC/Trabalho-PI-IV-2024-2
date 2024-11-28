import React, { useEffect, useState } from 'react'

const CadastroNovidades: React.FC = () => {

    interface Novidade {
        id: number;
        titulo: string;
        descricao: string;
    }

    const [showPopup, setShowPopup] = useState(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [novidades, setNovidades] = useState<Novidade[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);


    useEffect(() => {
        fetchNovidades();
    }, []);

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => {
                setMensagem('');
                setMensagemTipo('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const fetchNovidades = async () => {
        try {
            const response = await fetch('http://localhost:5000/novidades');
            if (response.ok) {
                const data = await response.json();
                setNovidades(data.novidade)
            } else {
                console.error('Erro ao buscar os dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleNovaNovidade = () => {
        const maiorId = novidades.reduce(
            (max, novidade) => (novidade.id > max ? novidade.id : max),
            0
        );
        setId(maiorId + 1);
        setShowPopup(true);
    };

    const handleEditarNovidade = (index: number) => {
        const novidade = novidades[index];
        setId(novidade.id);
        setTitulo(novidade.titulo);
        setDescricao(novidade.descricao);
        setEditingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setId(undefined);
        setTitulo('');
        setDescricao('');
        setEditingIndex(null);
        setErrorMessage('')
    };

    const handleSalvarNovidade = async () => {

        if (!titulo || !descricao) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        const novaNovidade: Novidade = {
            id: id!,
            titulo,
            descricao,
        };

        try {
            if (editingIndex !== null) {
                // Método PUT para atualizar um professor existente
                const response = await fetch(`http://localhost:5000/novidades/${novaNovidade.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novaNovidade),
                });

                if (response.ok) {
                    const updatedNovidade = [...novidades];
                    updatedNovidade[editingIndex] = novaNovidade;
                    setNovidades(updatedNovidade);
                    setMensagem('Novidade atualizado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao atualizar a novidade.');
                    setMensagemTipo('erro');
                    console.error('Erro ao atualizar a novidade:', response.statusText);
                }
            } else {

                const response = await fetch('http://localhost:5000/novidades', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novaNovidade),
                });

                if (response.ok) {
                    fetchNovidades();
                    setNovidades([...novidades, novaNovidade]);
                    setMensagem('Novidade registrado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao registrar a novidade.');
                    setMensagemTipo('erro');
                    console.error('Erro ao adicionar a novidade:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

        handleClosePopup();
    };

    const handleExcluirNovidade = async (index: number) => {
        const novidade = novidades[index];

        try {
            const response = await fetch(`http://localhost:5000/novidades/${novidade.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchNovidades();
                setNovidades(novidades.filter((_, i) => i !== index));
                setMensagem('Novidade excluida com sucesso!')
                setMensagemTipo('sucesso');
            } else {
                setMensagem('Erro ao excluir a novidade.');
                setMensagemTipo('erro');
                console.error('Erro ao excluir a novidade:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    // Cálculo de páginas e seleção de dados para a página atual
    const indexOfLastNovidade = currentPage * itemsPerPage;
    const indexOfFirstNovidade = indexOfLastNovidade - itemsPerPage;
    const currentNovidade = novidades.slice(indexOfFirstNovidade, indexOfLastNovidade);

    // Alterar página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calcular número de páginas
    const totalPages = Math.ceil(novidades.length / itemsPerPage);

    return (
        <div className='background'>
            <button className='botaoAdd' onClick={handleNovaNovidade}> + NOVA NOVIDADE</button>

            <table className='tabela'>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', width: '5%' }}>ID</th>
                        <th style={{ textAlign: 'left', width: '22%' }}>Titulo</th>
                        <th style={{ textAlign: 'left', width: '60%' }}>Descrição</th>
                        <th style={{ textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNovidade.map((novidade, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{novidade.id}</td>
                            <td style={{ textAlign: 'left' }}>{novidade.titulo}</td>
                            <td style={{ textAlign: 'left' }}>{novidade.descricao}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEditarNovidade(index)}>Editar</button>
                                <button onClick={() => handleExcluirNovidade(index)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-container">
                <button className="pagination-button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-button" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </button>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>{editingIndex !== null ? 'Editar Novidade' : 'Nova Novidade'}</h3>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <label htmlFor="matricula">ID:</label>
                            <input
                                id="id"
                                style={{ width: '20%', textAlign: 'center' }}
                                type="number"
                                value={id}
                                disabled
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="nome">Título:</label>
                                <input
                                    id="titulo"
                                    type="text"
                                    placeholder="Título"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', height: '160px' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="nome">Descrição:</label>
                                <textarea
                                    id="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    style={{ height: '143px', resize: 'none' }}
                                />
                            </div>
                        </div>

                        <button className='botaoSalvar' onClick={handleSalvarNovidade}>Salvar</button>
                        <button className='botaoCancelar' onClick={handleClosePopup}>Cancelar</button>
                    </div>
                </div>
            )}
            {mensagem && (
                <div className={`mensagem ${mensagemTipo}`}>
                    {mensagem}
                </div>
            )}
        </div>
    );
}


export default CadastroNovidades
