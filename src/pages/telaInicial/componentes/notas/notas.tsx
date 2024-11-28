// /src/components/Notas/Notas.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Notas: React.FC<{ materia: string }> = ({ materia }) => {
    const [notasSemestre1, setNotasSemestre1] = useState({
        prova: '8.5',
        trabalho: '9.0',
        deverCasa: '7.5',
        projeto: '8.0',
        participacao: '9.5'
    });

    const [notasSemestre2, setNotasSemestre2] = useState({
        prova: '8.0',
        trabalho: '8.5',
        deverCasa: '7.0',
        projeto: '8.5',
        participacao: '9.0'
    });

    return (
        <Grid container justifyContent="center" alignItems="flex-start" spacing={2} style={{ maxHeight: '100%', paddingTop: '50px' }}>
            <Grid item xs={12}>
                <Card elevation={3} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Notas de {materia}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card elevation={3} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                            1º Semestre
                        </Typography>
                        <Typography variant="h6" component="h4">Nota da Prova</Typography>
                        <Typography variant="body1">{notasSemestre1.prova}</Typography>
                        <Typography variant="h6" component="h4">Nota do Trabalho</Typography>
                        <Typography variant="body1">{notasSemestre1.trabalho}</Typography>
                        <Typography variant="h6" component="h4">Nota do Dever de Casa</Typography>
                        <Typography variant="body1">{notasSemestre1.deverCasa}</Typography>
                        <Typography variant="h6" component="h4">Nota do Projeto</Typography>
                        <Typography variant="body1">{notasSemestre1.projeto}</Typography>
                        <Typography variant="h6" component="h4">Nota de Participação</Typography>
                        <Typography variant="body1">{notasSemestre1.participacao}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card elevation={3} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                            2º Semestre
                        </Typography>
                        <Typography variant="h6" component="h4">Nota da Prova</Typography>
                        <Typography variant="body1">{notasSemestre2.prova}</Typography>
                        <Typography variant="h6" component="h4">Nota do Trabalho</Typography>
                        <Typography variant="body1">{notasSemestre2.trabalho}</Typography>
                        <Typography variant="h6" component="h4">Nota do Dever de Casa</Typography>
                        <Typography variant="body1">{notasSemestre2.deverCasa}</Typography>
                        <Typography variant="h6" component="h4">Nota do Projeto</Typography>
                        <Typography variant="body1">{notasSemestre2.projeto}</Typography>
                        <Typography variant="h6" component="h4">Nota de Participação</Typography>
                        <Typography variant="body1">{notasSemestre2.participacao}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Notas;
