import React, { useState } from 'react';
import './cadastro.css';
import CadastroAluno from './cadastroAluno/cadastroAluno';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import fundoAluno from '../../../../assets/imagens/fundoAluno.jpg'
import fundoProfessor from '../../../../assets/imagens/fundoProf.jpg'
import CadastroProfessor from './cadastroProfessor/cadastroProfessor';

const Cadastro: React.FC = () => {
  const [componenteSelecionado, setcomponenteSelecionado] = useState<React.ReactNode>(null);

  const cadastroArray = [
    { cadastro: 'Aluno', imagem: fundoAluno, width: '225px', height: '225px', component: <CadastroAluno /> },
    { cadastro: 'Professor', imagem: fundoProfessor, width: '308px', height: '225px', component: <CadastroProfessor /> }, // Altere para o componente desejado
  ];

  const handleCardClick = (component: React.ReactNode) => {
    setcomponenteSelecionado(component);
  };

  const voltar = () => {
    setcomponenteSelecionado(null)
  };

  return (
    <div>
      {!componenteSelecionado ? (
        <div className='container'>
          {cadastroArray.map((item, index) => (
            <div className='cards' key={index} onClick={() => handleCardClick(item.component)}>
              <div className='areaNomeCadastro'>{item.cadastro}</div>
              <div className='imagemCard'>
                <img style={{ width: item.width, height: item.height }} src={item.imagem} alt="" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>
            <button className='botao' onClick={voltar}>
              <FontAwesomeIcon icon={faArrowLeft} /> Voltar
            </button>

          </div>
          <div className='selectedComponent'>{componenteSelecionado}</div>
        </div>
      )}
    </div>
  );
}

export default Cadastro;