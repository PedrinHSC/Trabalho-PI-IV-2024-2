import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './cadastroAluno.css'

const CadastroAluno: React.FC = () => {

    interface Aluno {
        matricula: number;
        nome: string;
        senha: string;
        turma: number;
        tipo: string;
        situacao: string;
    }

    const [showPopup, setShowPopup] = useState(false);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [matricula, setMatricula] = useState<number | undefined>(undefined);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [turma, setTurma] = useState<number | undefined>(undefined);
    const [tipo] = useState('Aluno');
    const [situacao, setSituacao] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [usuarios, setUsuarios] = useState<Aluno[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // Defina o número de registros por página


    useEffect(() => {
        fetchUsuarios();
    }, []);

    useEffect(() => {
        // Limpar mensagem automaticamente após 3 segundos
        if (mensagem) {
            const timer = setTimeout(() => {
                setMensagem('');
                setMensagemTipo('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:5000/usuarios');
            if (response.ok) {
                const data = await response.json();
                const alunos = Array.isArray(data.usuarios)
                    ? data.usuarios.filter((usuario: Aluno) => usuario.tipo === 'Aluno')
                    : [];
                setUsuarios(data.usuarios)
                setAlunos(alunos);
            } else {
                console.error('Erro ao buscar os dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleNovoAluno = () => {
        const maiorMatricula = usuarios.reduce(
            (max, usuario) => (usuario.matricula > max ? usuario.matricula : max),
            0
        );
        setMatricula(maiorMatricula + 1);
        setShowPopup(true);
    };

    const handleEditarAluno = (index: number) => {
        const aluno = alunos[index];
        setMatricula(aluno.matricula);
        setNome(aluno.nome);
        setSenha(aluno.senha);
        setTurma(aluno.turma);
        setSituacao(aluno.situacao);
        setEditingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setMatricula(undefined);
        setNome('');
        setSenha('');
        setTurma(undefined);
        setSituacao('');
        setEditingIndex(null);
        setErrorMessage('')
    };

    const handleSalvarAluno = async () => {

        if (!nome || !senha || !turma || !situacao) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        const novoAluno: Aluno = {
            matricula: matricula!,
            nome,
            senha,
            turma: turma!,
            tipo,
            situacao,
        };

        try {
            if (editingIndex !== null) {
                const response = await fetch(`http://localhost:5000/usuarios/${novoAluno.matricula}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoAluno),
                });

                if (response.ok) {
                    const updatedAlunos = [...alunos];
                    updatedAlunos[editingIndex] = novoAluno;
                    setAlunos(updatedAlunos);
                    setMensagem('Aluno atualizado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao atualizar o aluno.');
                    setMensagemTipo('erro');
                    console.error('Erro ao atualizar o aluno:', response.statusText);
                }
            } else {
                const response = await fetch('http://localhost:5000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoAluno),
                });

                if (response.ok) {
                    fetchUsuarios();
                    setAlunos([...alunos, novoAluno]);
                    setMensagem('Aluno registrado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao registrar o aluno.');
                    setMensagemTipo('erro');
                    console.error('Erro ao adicionar o aluno:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

        handleClosePopup();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleExcluirAluno = async (index: number) => {
        const aluno = alunos[index];

        try {
            const response = await fetch(`http://localhost:5000/usuarios/${aluno.matricula}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchUsuarios();
                setAlunos(alunos.filter((_, i) => i !== index));
                setMensagem('Aluno excluido com sucesso!')
                setMensagemTipo('sucesso');
            } else {
                setMensagem('Erro ao excluir o aluno.');
                setMensagemTipo('erro');
                console.error('Erro ao excluir o aluno:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const indexOfLastAluno = currentPage * itemsPerPage;
    const indexOfFirstAluno = indexOfLastAluno - itemsPerPage;
    const currentAlunos = alunos.slice(indexOfFirstAluno, indexOfLastAluno);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(alunos.length / itemsPerPage);

    return (
        <div className='background'>
            <button className='botaoAdd' onClick={handleNovoAluno}> + NOVO ALUNO</button>

            <table className='tabela'>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', width: '8%' }}>Matrícula</th>
                        <th style={{ textAlign: 'left', width: '22%' }}>Nome</th>
                        <th style={{ textAlign: 'left', width: '12%' }}>Senha</th>
                        <th style={{ textAlign: 'left' }}>Turma</th>
                        <th style={{ textAlign: 'left' }}>Tipo</th>
                        <th style={{ textAlign: 'left' }}>Situação</th>
                        <th style={{ textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAlunos.map((aluno, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{aluno.matricula}</td>
                            <td style={{ textAlign: 'left' }}>{aluno.nome}</td>
                            <td style={{ textAlign: 'left' }}>{'*'.repeat(aluno.senha.length)}</td>
                            <td style={{ textAlign: 'left' }}>{aluno.turma}º Ano</td>
                            <td style={{ textAlign: 'left' }}>{aluno.tipo}</td>
                            <td style={{ textAlign: 'left' }}>{aluno.situacao}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEditarAluno(index)}>Editar</button>
                                <button onClick={() => handleExcluirAluno(index)}>Excluir</button>
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
                        <h3>{editingIndex !== null ? 'Editar Aluno' : 'Novo Aluno'}</h3>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <label htmlFor="matricula">Matrícula:</label>
                            <input
                                id="matricula"
                                style={{ width: '20%', textAlign: 'center' }}
                                type="number"
                                value={matricula}
                                placeholder="Matrícula"
                                disabled
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '61%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div style={{ width: '38%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    id="senha"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '48%',
                                        right: '20px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

                            <div style={{ width: '49.5%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="turma">Turma:</label>
                                <select
                                    style={{ width: '98%' }}
                                    id="turma"
                                    value={turma ?? ''}
                                    onChange={(e) => setTurma(parseInt(e.target.value))}
                                >
                                    <option value="">Selecione a Turma</option>
                                    <option value="6">6º ano</option>
                                    <option value="7">7º ano</option>
                                    <option value="8">8º ano</option>
                                    <option value="9">9º ano</option>
                                    <option value="1">1º ano</option>
                                    <option value="2">2º ano</option>
                                    <option value="3">3º ano</option>
                                </select>
                            </div>
                            <div style={{ width: '49.5%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="tipo">Tipo:</label>
                                <input id="tipo" style={{ width: '98%' }} type="text" placeholder="Tipo" value={tipo} disabled />
                            </div>

                            <div style={{ width: '49.5%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="situacao">Situação:</label>
                                <select
                                    id="situacao"
                                    style={{ width: '100%' }}
                                    value={situacao}
                                    onChange={(e) => setSituacao(e.target.value)}
                                >
                                    <option value="">Selecione a Situação</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <button className='botaoSalvar' onClick={handleSalvarAluno}>Salvar</button>
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

export default CadastroAluno
