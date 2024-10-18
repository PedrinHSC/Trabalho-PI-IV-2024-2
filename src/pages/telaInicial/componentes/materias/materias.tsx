import React from 'react'
import './materias.css'

const Materias: React.FC = () => {

    return (
        <div className='container'>
            {['Portugues', 'Matematica', 'Historia', 'Geografia', 'Fisica', 'Biologia', 'Quimica'].map((materia) => (
                <div className='card'>
                    <div style={{ backgroundColor: 'greenyellow', height: '40%', borderRadius: '10px 10px 0px 0px' }}></div>
                    <div className='areaNomeMateria'>{materia}</div>
                </div>
            ))}
        </div>

    )
}

export default Materias
