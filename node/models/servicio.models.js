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
        costo:{
            type: Number,
            required: true
        },
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