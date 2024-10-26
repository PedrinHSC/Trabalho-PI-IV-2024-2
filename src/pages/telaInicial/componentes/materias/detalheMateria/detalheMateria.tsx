import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logoPrefeituraVixHoriz from '../../../../../assets/imagens/logoPrefeituraVixHoriz.png';
import './detalheMateria.css';

const DetalhesMateria: React.FC = () => {
    const { materia } = useParams<{ materia: string }>();
    const navegacao = useNavigate();
    const location = useLocation();
    const [itemSelecionado, setItemSelecionado] = useState<string>('conteudo');
    const [arrayItemMenu, setArrayItemMenu] = useState<{ nome: string, path: string }[]>([]);

    useEffect(() => {
        console.log('materia', materia);

        setArrayItemMenu([
            { nome: 'Conteúdo', path: 'conteudo' },
            { nome: 'Atividade', path: 'atividade' },
            { nome: 'Reforço', path: 'reforco' },
            { nome: 'Notas', path: 'notas' }
        ]);
        // Extrair a última parte do caminho e definir como o item selecionado
        const path = location.pathname.replace('/', '');
        setItemSelecionado(path || 'conteudo');
        console.log('path', path);


    }, [location]);

    const voltar = () => {
        navegacao('/inicio/materias');
    };

    const atualizaUrl = (rota: string) => {
        setItemSelecionado(rota);
        navegacao(`/${rota}`);
    };

    const renderizarConteudo = () => {
        switch (itemSelecionado) {
            case 'conteudo':
                return <div>Conteúdo da página Conteúdo</div>;
            case 'atividade':
                return <div>Conteúdo da página Atividade</div>;
            case 'reforco':
                return <div>Conteúdo da página Reforço</div>;
            case 'notas':
                return <div>Conteúdo da página Notas</div>;
            default:
                return <div>Conteúdo não encontrado</div>;
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
                            <strong>{materia}</strong>
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
