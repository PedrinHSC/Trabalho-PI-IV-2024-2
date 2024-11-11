import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './telaInicial.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Inicio from './componentes/inicio/inicio'
import Materias from './componentes/materias/materias'
import Cadastro from './componentes/cadastro/cadastro'
import logoPrefeituraVixHoriz from '../../assets/imagens/logoPrefeituraVixHoriz.png'

interface Usuario {
    nome: string;
    turma: string;
    tipo: string;
}

const TelaInicial: React.FC = () => {
    const navegacao = useNavigate()
    const location = useLocation();
    const [conteudo, setConteudo] = useState('inicio');
    const [itemSelecionado, setItemSelecionado] = useState('inicio');
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [arrayItemMenu, setArrayItemMenu] = useState<{ nome: string, path: string }[]>([]);

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
        navegacao('/')
    }

    const atualizaUrl = (rota: string) => {
        setItemSelecionado(rota);
        navegacao(`/${rota}`)
    }

    const getTipo = () => {
        const tipo = usuario?.tipo
        let cabecTipo = '';

        if (tipo) {
            if (tipo == 'Aluno') cabecTipo = 'Aluno / Turma'
            if (tipo == 'Professor') cabecTipo = 'Professor'
            if (tipo == 'Desenvolvedor') cabecTipo = 'Desenvolvedor'
        }
        return cabecTipo
    }

    const renderizarConteudo = () => {
        switch (conteudo) {

            case 'inicio':
                return <Inicio />;
            case 'inicio/calendario':
                return <div>Conteúdo da página Calendário</div>;
            case 'inicio/materias':
                return <Materias />;
            case 'inicio/contato':
                return <div>Conteúdo da página Contato</div>;
            case 'inicio/novidades':
                return <div>Conteúdo da página Novidades</div>;
            case 'inicio/cadastro':
                return <Cadastro />;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className='sidebar'>
                <div className="imag">
                    <img src={logoPrefeituraVixHoriz} alt="" />
                </div>

                <div className='opcoes'>
                    <nav>
                        <ul>
                            {arrayItemMenu.map((item) => (
                                <li
                                    key={item.path}
                                    className={itemSelecionado == item.path ? 'selected' : ''}
                                    onClick={() => atualizaUrl(item.path)}
                                >
                                    {item.nome.charAt(0).toUpperCase() + item.nome.slice(1)}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='areaVisual'>
                <div className='header'>
                    <div>
                        <div><strong> {getTipo()}</strong></div>
                        <div>{!usuario?.turma ? `${usuario?.nome}` : `${usuario?.nome} / ${usuario?.turma}° ano`}</div>
                    </div>

                    <div>
                        <button className='botaoSair' onClick={sair}><FontAwesomeIcon icon={faRightFromBracket} /></button>
                    </div>
                </div>
                <div className='elementos'>
                    {renderizarConteudo()}
                </div>

            </div>
        </div>
    )
}

export default TelaInicial
