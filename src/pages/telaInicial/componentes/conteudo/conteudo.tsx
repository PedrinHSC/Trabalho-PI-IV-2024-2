// /src/components/Conteudo/Conteudo.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Conteudo: React.FC<{ materia: string }> = ({ materia }) => {
    // Dados simulados para os cards
    const conteudos = [
        { id: 1, titulo: `Introdução a ${materia}`, descricao: `Descrição do tópico 1 de ${materia}` },
        { id: 2, titulo: `Conceitos básicos de ${materia}`, descricao: `Descrição do tópico 2 de ${materia}` },
        { id: 3, titulo: `Exemplos práticos de ${materia}`, descricao: `Descrição do tópico 3 de ${materia}` },
    ];

    return (
        <div>
            <h3>Conteúdo de {materia}</h3>
            <p>Aqui você encontrará o conteúdo teórico da matéria {materia}.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
                {conteudos.map(conteudo => (
                    <Card key={conteudo.id} style={{ width: '30%' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {conteudo.titulo}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {conteudo.descricao}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Utilize a área de reforço para tirar dúvidas!</p>
        </div>
    );
};

export default Conteudo;
