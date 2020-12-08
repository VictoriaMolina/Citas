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
        servicio: {
            type: String,
            required: true,
            value: ["Corte de cabello", "Uñas", "Maquillaje"]
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