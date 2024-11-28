import mongoose from 'mongoose';

const EventoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    allDay: { type: Boolean, default: true },
});

const Eventos = mongoose.model('Eventos', EventoSchema);

export default Eventos;