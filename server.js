import express from 'express';
import cors from 'cors';
import dataModelUsuario from './DatamodelUsuario.js';
import conectarBanco from './Database.js';
import dataModelNovidades from './DatamodelNovidades.js'
import dataModelEventos from './DatamodelEventosCalendario.js'

conectarBanco();
const app = express()
app.use(express.json())

app.use(cors())

//Rotas para alunos
app.get('/usuarios', async (req, res) => {
    const response = await dataModelUsuario.find();
    return res.json({ usuarios: response });
})

app.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = new dataModelUsuario(req.body);
        const response = await novoUsuario.save();
        return res.status(201).json({ usuario: response });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
});

app.put('/usuarios/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
        const usuarioAtualizado = await dataModelUsuario.findOneAndUpdate(
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
        const usuarioDeletado = await dataModelUsuario.findOneAndDelete({ matricula });

        if (!usuarioDeletado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
});

//Rotas para novidades
app.get('/novidades', async (req, res) => {
    const response = await dataModelNovidades.find();
    return res.json({ novidade: response });
})

app.post('/novidades', async (req, res) => {
    try {
        const novaNovidade = new dataModelNovidades(req.body);
        const response = await novaNovidade.save();
        return res.status(201).json({ novidade: response });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar a novidade' });
    }
});

app.put('/novidades/:id', async (req, res) => {
    const { matricula } = req.params;
    try {
        const usuarioAtualizado = await dataModelNovidades.findOneAndUpdate(
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

app.delete('/novidades/:id', async (req, res) => {
    const { matricula } = req.params;
    try {
        const usuarioDeletado = await dataModelNovidades.findOneAndDelete({ matricula });

        if (!usuarioDeletado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
});

// Rotas para eventos no calendário
app.get('/eventos', async (req, res) => {
    const eventos = await dataModelEventos.find();
    return res.json({ eventos });
});

app.post('/eventos', async (req, res) => {
    try {
        const novoEvento = new dataModelEventos(req.body);
        const response = await novoEvento.save();
        return res.status(201).json({ evento: response });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o evento' });
    }
});

app.put('/eventos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eventoAtualizado = await dataModelEventos.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!eventoAtualizado) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        return res.json({ evento: eventoAtualizado });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o evento' });
    }
});

app.delete('/eventos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eventoDeletado = await dataModelEventos.findByIdAndDelete(id);
        if (!eventoDeletado) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        return res.json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar o evento' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta: ${PORT}`);
})
