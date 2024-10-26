import React from 'react'
import './materias.css'
import imagPort from '../../../../assets/imagens/fundoPort.jpg'
import imagMat from '../../../../assets/imagens/fundoMat.jpg'
import imagHis from '../../../../assets/imagens/fundoHist.jpg'
import imagGeo from '../../../../assets/imagens/fundoGeog.jpg'
import imagCien from '../../../../assets/imagens/fundoCien.jpg'
import imagFis from '../../../../assets/imagens/fundoFis.jpg'
import imagBio from '../../../../assets/imagens/fundoBio.jpg'
import imagQuim from '../../../../assets/imagens/fundoQuim.jpg'
import { useNavigate } from 'react-router-dom'
const Materias: React.FC = () => {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuarioLogado');
    const infoUsuario = JSON.parse(usuario as string)
    const turma = infoUsuario?.turma || 0

    const materiasArray = turma >= 6 && turma <= 9 ? [
        { materia: 'Português', imagem: imagPort, path: `/${turma}/portugues` },
        { materia: 'Matemática', imagem: imagMat, path: `/${turma}/matematica` },
        { materia: 'História', imagem: imagHis, path: `/${turma}/historia` },
        { materia: 'Geografia', imagem: imagGeo, path: `/${turma}/geografia` },
        { materia: 'Ciências', imagem: imagCien, path: `/${turma}/ciencias` },
    ] : turma >= 1 && turma <= 3 ? [
        { materia: 'Português', imagem: imagPort, path: `/${turma}/portugues` },
        { materia: 'Matemática', imagem: imagMat, path: `/${turma}/matematica` },
        { materia: 'História', imagem: imagHis, path: `/${turma}/historia` },
        { materia: 'Geografia', imagem: imagGeo, path: `/${turma}/geografia` },
        { materia: 'Física', imagem: imagFis, path: `/${turma}/fisica` },
        { materia: 'Biologia', imagem: imagBio, path: `/${turma}/biologia` },
        { materia: 'Química', imagem: imagQuim, path: `/${turma}/quimica` },
    ] : [
        { materia: 'Português', imagem: imagPort, path: `/${turma}/portugues` },
        { materia: 'Matemática', imagem: imagMat, path: `/${turma}/matematica` },
        { materia: 'História', imagem: imagHis, path: `/${turma}/historia` },
        { materia: 'Geografia', imagem: imagGeo, path: `/${turma}/geografia` },
        { materia: 'Física', imagem: imagFis, path: `/${turma}/fisica` },
        { materia: 'Biologia', imagem: imagBio, path: `/${turma}/biologia` },
        { materia: 'Química', imagem: imagQuim, path: `/${turma}/quimica` }
    ];

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className='container'>
            {materiasArray.map((item, index) => (
                <div className='card' key={index} onClick={() => handleCardClick(item.path)}>
                    <div style={{ height: '40%', borderRadius: '10px 10px 0px 0px' }}>
                        <img src={item.imagem} alt={item.materia} style={{ width: '100%', height: '100%', borderRadius: '10px 10px 0px 0px', objectFit: 'cover' }} />
                    </div>
                    <div className='areaNomeMateria'>{item.materia}</div>
                </div>
            ))}
        </div>

    )
}

export default Materias
