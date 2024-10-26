import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPrefeituraVert from '../../assets/imagens/logoPrefeituraVixVert.png';

interface Usuario {
  nome: string;
  matricula: string;
  senha: string;
  situacao: string;
  turma: string;
  tipo: string;
}
const Login: React.FC = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navegacao = useNavigate()
  const matriculaTeste = '00001'
  const senhaTeste = '12345'

  useEffect(() => {
    const usuarios = async () => {
      try {
        const res = await fetch('http://localhost:5000/usuarios')
        const data = await res.json()
        setUsuarios(data.usuarios)

      } catch (error) {
        console.log(`Erro: ${error}`)
      }
    }
    usuarios();
  }, [])

  const alterarIconeSenha = () => {
    setMostrarSenha(prevState => !prevState);
  }

  const enviarFormulario = (evento: any) => {
    evento.preventDefault();

    const usuarioEncontrado = usuarios.find((usuario: any) =>
      usuario.matricula == matricula && usuario.senha == senha && usuario.situacao == 'Ativo'
    );

    if (usuarioEncontrado || (matricula == matriculaTeste && senha == senhaTeste)) {

      const usuarioSalvar = {
        nome: usuarioEncontrado?.nome,
        matricula: usuarioEncontrado?.matricula,
        turma: usuarioEncontrado?.turma,
        tipo: usuarioEncontrado?.tipo
      };

      const temLocalStorage = localStorage.getItem('usuarioLogado')
      if (temLocalStorage) localStorage.removeItem('usuarioLogado');

      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSalvar));
      navegacao('/inicio');
    } else {
      alert('Senha ou matricula invalidas')
    }
  }


  return (
    <div className='principal'>
      <div className='formulario'>

        <div className='titulo'>
          <img className='imagem' src={logoPrefeituraVert} alt="Logo Prefeitura de Vitória" />
        </div>

        <form onSubmit={enviarFormulario}>
          <input type="number" placeholder='Matrícula' onChange={(e) => setMatricula(e.target.value)} />
          <div className="password-container">
            <input type={mostrarSenha ? "text" : "password"} placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
            <button type="button" id="togglePassword" className="eye-btn" onClick={alterarIconeSenha}>
              <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} />
            </button>
          </div>
          <button>Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
