import mongoose from 'mongoose';
const dataSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    descricao: String,
})

const Novidades = mongoose.model("Novidades", dataSchema);

export default Novidades;