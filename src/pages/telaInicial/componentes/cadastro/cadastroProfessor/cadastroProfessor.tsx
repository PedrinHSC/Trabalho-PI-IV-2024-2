import React, { useEffect, useState } from 'react';
import './cadastroProfessor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const CadastroProfessor: React.FC = () => {
    interface Professor {
        matricula: number;
        nome: string;
        senha: string;
        materia: string;
        turma: number;
        tipo: string;
        situacao: string;
    }

    const [showPopup, setShowPopup] = useState(false);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [matricula, setMatricula] = useState<number | undefined>(undefined);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [materia, setMateria] = useState('');
    const [turma, setTurmas] = useState<number | undefined>(undefined);
    const [tipo] = useState('Professor');
    const [situacao, setSituacao] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [usuarios, setUsuarios] = useState<Professor[]>([]);
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
                const professores = Array.isArray(data.usuarios)
                    ? data.usuarios.filter((usuario: Professor) => usuario.tipo === 'Professor')
                    : [];
                setUsuarios(data.usuarios)
                setProfessores(professores);
            } else {
                console.error('Erro ao buscar os dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleNovoProfessor = () => {
        const maiorMatricula = usuarios.reduce(
            (max, usuario) => (usuario.matricula > max ? usuario.matricula : max),
            0
        );
        setMatricula(maiorMatricula + 1);
        setShowPopup(true);
    };

    const handleEditarProfessor = (index: number) => {
        const professor = professores[index];
        setMatricula(professor.matricula);
        setNome(professor.nome);
        setSenha(professor.senha);
        setMateria(professor.materia);
        setTurmas(professor.turma);
        setSituacao(professor.situacao);
        setEditingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setMatricula(undefined);
        setNome('');
        setSenha('');
        setMateria('');
        setTurmas(undefined);
        setSituacao('');
        setEditingIndex(null);
        setErrorMessage('')
    };

    const handleSalvarProfessor = async () => {

        if (!nome || !senha || !materia || !turma || !situacao) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        const novoProfessor: Professor = {
            matricula: matricula!,
            nome,
            senha,
            materia,
            turma: turma!,
            tipo,
            situacao,
        };

        try {
            if (editingIndex !== null) {
                // Método PUT para atualizar um professor existente
                const response = await fetch(`http://localhost:5000/usuarios/${novoProfessor.matricula}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoProfessor),
                });

                if (response.ok) {
                    const updatedProfessores = [...professores];
                    updatedProfessores[editingIndex] = novoProfessor;
                    setProfessores(updatedProfessores);
                    setMensagem('Professor atualizado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao atualizar o professor.');
                    setMensagemTipo('erro');
                    console.error('Erro ao atualizar o professor:', response.statusText);
                }
            } else {
                // Método POST para adicionar um novo professor
                const response = await fetch('http://localhost:5000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoProfessor),
                });

                if (response.ok) {
                    fetchUsuarios();
                    setProfessores([...professores, novoProfessor]);
                    setMensagem('Professor registrado com sucesso!');
                    setMensagemTipo('sucesso');
                } else {
                    setMensagem('Erro ao registrar o professor.');
                    setMensagemTipo('erro');
                    console.error('Erro ao adicionar o professor:', response.statusText);
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

    const handleExcluirProfessor = async (index: number) => {
        const professor = professores[index];

        try {
            const response = await fetch(`http://localhost:5000/usuarios/${professor.matricula}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchUsuarios();
                const updatedProfessores = professores.filter((_, i) => i !== index);
                setProfessores(updatedProfessores);
                setMensagem('Professor excluido com sucesso!')
                setMensagemTipo('sucesso');
            } else {
                setMensagem('Erro ao excluir o professor.');
                setMensagemTipo('erro');
                console.error('Erro ao excluir o professor:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    // Cálculo de páginas e seleção de dados para a página atual
    const indexOfLastProfessor = currentPage * itemsPerPage;
    const indexOfFirstProfessor = indexOfLastProfessor - itemsPerPage;
    const currentProfessores = professores.slice(indexOfFirstProfessor, indexOfLastProfessor);

    // Alterar página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calcular número de páginas
    const totalPages = Math.ceil(professores.length / itemsPerPage);

    return (
        <div className='background'>
            <button className='botaoAdd' onClick={handleNovoProfessor}> + NOVO PROFESSOR</button>

            <table className='tabela'>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', width: '8%' }}>Matrícula</th>
                        <th style={{ textAlign: 'left', width: '22%' }}>Nome</th>
                        <th style={{ textAlign: 'left', width: '12%' }}>Senha</th>
                        <th style={{ textAlign: 'left', width: '10%' }}>Matéria</th>
                        <th style={{ textAlign: 'left' }}>Turma</th>
                        <th style={{ textAlign: 'left' }}>Tipo</th>
                        <th style={{ textAlign: 'left' }}>Situação</th>
                        <th style={{ textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProfessores.map((professor, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{professor.matricula}</td>
                            <td style={{ textAlign: 'left' }}>{professor.nome}</td>
                            <td style={{ textAlign: 'left' }}>{'*'.repeat(professor.senha.length)}</td>
                            <td style={{ textAlign: 'left' }}>{professor.materia}</td>
                            <td style={{ textAlign: 'left' }}>{professor.turma}º Ano</td>
                            <td style={{ textAlign: 'left' }}>{professor.tipo}</td>
                            <td style={{ textAlign: 'left' }}>{professor.situacao}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEditarProfessor(index)}>Editar</button>
                                <button onClick={() => handleExcluirProfessor(index)}>Excluir</button>
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
                        <h3>{editingIndex !== null ? 'Editar Professor' : 'Novo Professor'}</h3>

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
                                        top: '41%',
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
                                <label htmlFor="materia">Matéria:</label>
                                <select
                                    id="materia"
                                    value={materia}
                                    onChange={(e) => setMateria(e.target.value)}
                                >
                                    <option value="">Selecione a Matéria</option>
                                    <option value="Matemática">Matemática</option>
                                    <option value="Português">Português</option>
                                    <option value="História">História</option>
                                    <option value="Geografia">Geografia</option>
                                    <option value="Ciências">Ciências</option>
                                    <option value="Inglês">Inglês</option>
                                    <option value="Física">Física</option>
                                    <option value="Química">Química</option>
                                    <option value="Biologia">Biologia</option>
                                </select>
                            </div>

                            <div style={{ width: '49.5%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="turma">Turma:</label>
                                <select
                                    id="turma"
                                    value={turma ?? ''}
                                    onChange={(e) => setTurmas(parseInt(e.target.value))}
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
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '49.5%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <label htmlFor="tipo">Tipo:</label>
                                <input id="tipo" style={{ width: '100%' }} type="text" placeholder="Tipo" value={tipo} disabled />
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

                        <button className='botaoSalvar' onClick={handleSalvarProfessor}>Salvar</button>
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
};

export default CadastroProfessor;
