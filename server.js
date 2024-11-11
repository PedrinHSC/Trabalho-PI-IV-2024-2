import express from 'express';
import cors from 'cors';
import dataModel from './Datamodel.js';
import conectarBanco from './Database.js';

conectarBanco();
const app = express()
app.use(express.json())

app.use(cors())

app.get('/usuarios', async (req, res) => {
    const response = await dataModel.find();
    return res.json({ usuarios: response });
})

app.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = new dataModel(req.body);
        const response = await novoUsuario.save();
        return res.status(201).json({ usuario: response });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
});

app.put('/usuarios/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
        const usuarioAtualizado = await dataModel.findOneAndUpdate(
            { matricula },
            req.body,
            { new: true }
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({ usuario: usuarioAtualizado });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
});

app.delete('/usuarios/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
        const usuarioDeletado = await dataModel.findOneAndDelete({ matricula });

        if (!usuarioDeletado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta: ${PORT}`);
})
