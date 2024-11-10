import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logoPrefeituraVixHoriz from '../../../../../assets/imagens/logoPrefeituraVixHoriz.png';
import './detalheMateria.css';
import Conteudo from '../../conteudo/conteudo';
import Atividade from '../../atividades/ativiades';
import Reforco from '../../reforoco/reforco';
import Notas from '../../notas/notas';

const DetalhesMateria: React.FC = () => {
    const { materia, turma } = useParams<{ materia: string, turma: string }>();

    if (!materia || !turma) {
        return <div>Parâmetros inválidos</div>;
    }

    const navegacao = useNavigate();
    const location = useLocation();
    const [conteudo, setConteudo] = useState(`${turma}/${materia}/conteudo`);
    const [itemSelecionado, setItemSelecionado] = useState<string>(`${turma}/${materia}/conteudo`);
    const [arrayItemMenu, setArrayItemMenu] = useState<{ nome: string, path: string }[]>([]);

    useEffect(() => {
        setArrayItemMenu([
            { nome: 'Conteúdo', path: `${turma}/${materia}/conteudo` },
            { nome: 'Atividade', path: `${turma}/${materia}/atividade` },
            { nome: 'Reforço', path: `${turma}/${materia}/reforco` },
            { nome: 'Notas', path: `${turma}/${materia}/notas` }
        ]);

        if (location.pathname === `/${turma}/${materia}`) {
            navegacao(`/${turma}/${materia}/conteudo`, { replace: true });
        } else {
            setConteudo(location.pathname.replace('/', ''));
            setItemSelecionado(location.pathname.replace('/', ''));
        }

    }, [location.pathname, turma, materia, navegacao]);

    const voltar = () => {
        navegacao('/inicio/materias');
    };

    const atualizaUrl = (rota: string) => {
        setItemSelecionado(rota);
        navegacao(`/${rota}`);
    };

    const getTitulo = () => {
        switch (materia) {
            case 'matematica':
                return 'Matemática'
            case 'portugues':
                return 'Português'
            case 'ciencias':
                return 'Ciências'
            case 'historia':
                return 'História'
            case 'geografia':
                return 'Geografia'
            case 'fisica':
                return 'Física'
            case 'quimica':
                return 'Química'
            case 'biologia':
                return 'Biologia'
            case 'ingles':
                return 'Inglês'
        }
    }

    const renderizarConteudo = () => {
        switch (conteudo) {
            case `${turma}/${materia}/conteudo`:
                return <Conteudo materia={materia} />;
            case `${turma}/${materia}/atividade`:
                return <Atividade materia={materia} />;
            case `${turma}/${materia}/reforco`:
                return <Reforco materia={materia} />;
            case `${turma}/${materia}/notas`:
                return <Notas materia={materia} />;
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

            <div className='areaVisual'>
                <div className='heade'>
                    <div>
                        <button className='botaoVoltar' onClick={voltar}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                    <div>
                        <div style={{ fontSize: '30px' }}>
                            <strong>{getTitulo()}</strong>
                        </div>
                    </div>
                </div>
                <div className='elementos'>
                    {renderizarConteudo()}
                </div>
            </div>
        </div>
    );
};

export default DetalhesMateria;
