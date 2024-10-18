import mongoose from 'mongoose';
const dataSchema = new mongoose.Schema({
    matricula: Number,
    nome: String,
    senha: String,
    tipo: String,
    situacao: String
})

const Usuario = mongoose.model("Usuario", dataSchema);

export default Usuario;