const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        tiempo: {
            type: Number,
            required: true,
            default: 1,
        },
        costo: {
            type: Number,
            required: true
        }
    }
);

const Citas = mongoose.model('Cita', citaSchema);

module.exports = {
    Citas
};