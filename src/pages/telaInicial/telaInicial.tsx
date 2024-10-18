import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './telaInicial.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Inicio from './componentes/inicio/inicio'
import Materias from './componentes/materias/materias'
import Cadastro from './componentes/cadastro/cadastro'

const TelaInicial: React.FC = () => {
    const navegacao = useNavigate()
    const location = useLocation();
    const [conteudo, setConteudo] = useState('inicio');
    const [itemSelecionado, setItemSelecionado] = useState('inicio');

    useEffect(() => {
        const path = location.pathname.replace('/', '');
        setConteudo(path || 'inicio');
    }, [location]);

    const sair = () => {
        navegacao('/')
    }

    const atualizaUrl = (rota: string) => {
        setItemSelecionado(rota);
        (rota == 'inicio') ? navegacao(`/${rota}`) : navegacao(`/inicio/${rota}`)
    }

    const renderizarConteudo = () => {
        switch (conteudo) {
            case 'inicio':
                return <Inicio />;
            case 'inicio/calendario':
                return <div>Conteúdo da página Calendário</div>;
            case 'inicio/materias':
                return <Materias />;
            case 'inicio/eventos':
                return <div>Conteúdo da página Eventos</div>;
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
                    <img src="http://sescon-es.org.br/wordpress/wp-content/uploads/2021/10/a898ad4f0c9a44098ef24a4428358fd0.png" alt="" />
                </div>

                <div className='opcoes'>
                    <nav>
                        <ul>
                            {['inicio', 'calendario', 'materias', 'eventos', 'contato', 'novidades', 'cadastro'].map((item) => (
                                <li
                                    key={item}
                                    className={itemSelecionado === item ? 'selected' : ''}
                                    onClick={() => atualizaUrl(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='areaVisual'>
                <div className='header'>
                    <div>
                        <div><strong> Aluno / Turma</strong></div>
                        <div>Pedro Henrique Sossai Camata / 2° A</div>
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
