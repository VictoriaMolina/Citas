const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        },
        hora: {
            type: String,
            required: true
        },
        telefono: {
            type: Number,
            required: true
        },
    }
);

const Citas = mongoose.model('Cita', citaSchema);

module.exports = {
    Citas
};