const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema(
    {
        nombre: {
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
        costo: Number,
        imagen:{
            type: String,
            required: false
        }
    }
);

const Servicios = mongoose.model('Servicio', servicoSchema);

module.exports = {
    Servicios
};