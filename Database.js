import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const url = 'mongodb+srv://pedroDB:projetoiv@clusterpedro.apeav.mongodb.net/projetoiv?retryWrites=true&w=majority&appName=ClusterPedro';

const conectarBanco = async () => {
    try {
        await mongoose.connect(url);
        console.log('Banco Conectado');
    } catch (error) {
        console.log(error.message);
    }
}

export default conectarBanco;