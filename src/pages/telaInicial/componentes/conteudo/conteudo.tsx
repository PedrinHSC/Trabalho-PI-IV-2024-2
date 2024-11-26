// /src/components/Conteudo/Conteudo.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Conteudo: React.FC<{ materia: string }> = ({ }) => {
    // Dados simulados para os cards
    const conteudos = [
        { id: 1, titulo: `Introdução`, descricao: `Descrição do tópico 1` },
        { id: 2, titulo: `Conceitos básicos `, descricao: `Descrição do tópico 2` },
        { id: 3, titulo: `Exemplos práticos `, descricao: `Descrição do tópico 3` },
    ];

    return (
        <div>
            <p style={{ textAlign: 'center' }}>Aqui você encontrará o conteúdo teórico da matéria.</p>
            <div style={{ display: 'flex', gap: '16px', textAlign: 'center', justifyContent: 'center' }}>
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
