import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
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
        // Dados recebidos do cliente
        const novoUsuario = new dataModel(req.body);
        console.log('novoUsuario', novoUsuario)

        // Salvar no banco de dados
        const response = await novoUsuario.save();

        // Retornar a resposta ao cliente
        return res.status(201).json({ usuario: response });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta: ${PORT}`);
})
