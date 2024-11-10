// /src/components/Atividade/Atividade.tsx
import React, { useState, useEffect } from 'react';
import styles from './Atividade.module.css';

const Atividade: React.FC<{ materia: string }> = ({ materia }) => {
    const [atividades, setAtividades] = useState([
        { id: 1, title: 'Atividade 1', description: `Faça um resumo sobre ${materia}` },
        { id: 2, title: 'Atividade 2', description: 'Resolva os exercícios da página 10' },
        { id: 3, title: 'Atividade 3', description: 'Estude o capítulo 3 e prepare uma apresentação' },
        { id: 4, title: 'Atividade 4', description: 'Leia o artigo e faça uma análise crítica' },
        { id: 5, title: 'Atividade 5', description: 'Desenvolva um projeto prático sobre o tema' },
        { id: 6, title: 'Atividade 6', description: 'Participe do fórum de discussão' },
        { id: 7, title: 'Atividade 7', description: 'Faça um mapa mental do conteúdo' },
        { id: 8, title: 'Atividade 8', description: 'Responda ao questionário online' },
        { id: 9, title: 'Atividade 9', description: 'Assista ao vídeo e escreva um resumo' },
        { id: 10, title: 'Atividade 10', description: 'Prepare uma aula sobre o tema' },
    ]);

    useEffect(() => {
        // Future implementation: Fetch activities from a database
        // Example:
        // fetch('/api/atividades')
        //     .then(response => response.json())
        //     .then(data => setAtividades(data));
    }, []);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Atividades de {materia}</h3>
            <p className={styles.subtitle}>Complete as atividades abaixo:</p>
            <div className={styles.cards}>
                {atividades.map(atividade => (
                    <div key={atividade.id} className={styles.card}>
                        <h4>{atividade.title}</h4>
                        <p>{atividade.description}</p>
                    </div>
                ))}
            </div>
            <p className={styles.footer}><strong>Não hesite em perguntar se tiver dúvidas!</strong></p>
        </div>
    );
};

export default Atividade;
