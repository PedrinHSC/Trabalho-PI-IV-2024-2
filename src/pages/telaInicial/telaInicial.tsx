import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faPhoneAlt, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './telaInicial.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Inicio from './componentes/inicio/inicio';
import Materias from './componentes/materias/materias';
import Cadastro from './componentes/cadastro/cadastro';
import logoPrefeituraVixHoriz from '../../assets/imagens/logoPrefeituraVixHoriz.png';
import Calendario from './componentes/calendario/calendario';

interface Usuario {
    nome: string;
    turma: string;
    tipo: string;
}

const TelaInicial: React.FC = () => {
    const navegacao = useNavigate();
    const location = useLocation();
    const [conteudo, setConteudo] = useState('inicio');
    const [itemSelecionado, setItemSelecionado] = useState('inicio');
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [arrayItemMenu, setArrayItemMenu] = useState<{ nome: string; path: string }[]>([]);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
    }, []);

    useEffect(() => {
        if (usuario?.tipo === 'Desenvolvedor') {
            setArrayItemMenu([
                { nome: 'Início', path: 'inicio' },
                { nome: 'Calendário', path: 'inicio/calendario' },
                { nome: 'Matérias', path: 'inicio/materias' },
                { nome: 'Novidades', path: 'inicio/novidades' },
                { nome: 'Contato', path: 'inicio/contato' },
                { nome: 'Cadastro', path: 'inicio/cadastro' },
            ]);
        } else {
            setArrayItemMenu([
                { nome: 'Início', path: 'inicio' },
                { nome: 'Calendário', path: 'inicio/calendario' },
                { nome: 'Matérias', path: 'inicio/materias' },
                { nome: 'Novidades', path: 'inicio/novidades' },
                { nome: 'Contato', path: 'inicio/contato' },
            ]);
        }
    }, [usuario]);

    useEffect(() => {
        const path = location.pathname.replace('/', '');
        setConteudo(path);
        setItemSelecionado(path);
    }, [location]);

    const sair = () => {
        localStorage.removeItem('usuarioLogado');
        navegacao('/');
    };

    const atualizaUrl = (rota: string) => {
        setItemSelecionado(rota);
        navegacao(`/${rota}`);
    };

    const getTipo = () => {
        const tipo = usuario?.tipo;
        let cabecTipo = '';

        if (tipo) {
            if (tipo === 'Aluno') cabecTipo = 'Aluno / Turma';
            if (tipo === 'Professor') cabecTipo = 'Professor';
            if (tipo === 'Desenvolvedor') cabecTipo = 'Desenvolvedor';
        }
        return cabecTipo;
    };

    const renderizarConteudo = () => {
        switch (conteudo) {
            case 'inicio':
                return <Inicio />;
            case 'inicio/calendario':
                return <Calendario />;
            case 'inicio/materias':
                return <Materias />;
            case 'inicio/contato':
                return (
                    <Container className="py-4">
                        <h2 className="text-center mb-4">Contato</h2>
                        <div className="contact-cards">
                            <Card className="shadow-lg contact-card">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faPhoneAlt} size="4x" className="mb-3 text-primary" />
                                    <Card.Title>Telefone</Card.Title>
                                    <Card.Text>(27) 1234-5678</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="shadow-lg contact-card">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faEnvelope} size="4x" className="mb-3 text-primary" />
                                    <Card.Title>Email</Card.Title>
                                    <Card.Text>contato@escolavix.com.br</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="shadow-lg contact-card">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" className="mb-3 text-primary" />
                                    <Card.Title>Endereço</Card.Title>
                                    <Card.Text>
                                        Rua Alegria de Viver, 45<br />
                                        Jardim da Educação, Vitória - ES<br />
                                        CEP: 29000-000
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="shadow-lg contact-card">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faClock} size="4x" className="mb-3 text-primary" />
                                    <Card.Title>Horário de Atendimento</Card.Title>
                                    <Card.Text>
                                        Segunda a Sexta: 08:00 às 18:00<br />
                                        Sábado: 09:00 às 13:00
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                );
            case 'inicio/novidades':
                return <div>Conteúdo da página Novidades</div>;
            case 'inicio/cadastro':
                return <Cadastro />;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar">
                <div className="imag">
                    <img src={logoPrefeituraVixHoriz} alt="" />
                </div>

                <div className="opcoes">
                    <nav>
                        <ul>
                            {arrayItemMenu.map((item) => (
                                <li
                                    key={item.path}
                                    className={itemSelecionado === item.path ? 'selected' : ''}
                                    onClick={() => atualizaUrl(item.path)}
                                >
                                    {item.nome.charAt(0).toUpperCase() + item.nome.slice(1)}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="areaVisual">
                <div className="header">
                    <div>
                        <div>
                            <strong> {getTipo()}</strong>
                        </div>
                        <div>
                            {!usuario?.turma
                                ? `${usuario?.nome}`
                                : `${usuario?.nome} / ${usuario?.turma}° ano`}
                        </div>
                    </div>

                    <div>
                        <button className="botaoSair" onClick={sair}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    </div>
                </div>
                <div className="elementos">{renderizarConteudo()}</div>
            </div>
        </div>
    );
};

export default TelaInicial;
