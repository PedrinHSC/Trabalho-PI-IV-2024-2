// /src/components/Notas/Notas.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Box } from '@mui/material';

const Notas: React.FC<{ materia: string }> = ({ materia }) => {
    const [notas, setNotas] = useState('');

    const handleSaveNotes = () => {
        // Lógica para salvar as notas pode ser implementada aqui
        console.log(`Notas para ${materia}: ${notas}`);
        alert('Notas salvas!');
    };

    return (
        <Grid container justifyContent="center" alignItems="flex-start" style={{ maxHeight: '100%', paddingTop: '50px' }}>
            <Grid item xs={12} sm={8} md={6}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Notas de {materia}
                        </Typography>
                        <TextField
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                            placeholder={`Escreva suas notas sobre ${materia}`}
                            multiline
                            rows={6}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                onClick={handleSaveNotes}
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Salvar Notas
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Notas;
