var express = require('express');
const router = express.Router();

const {
    crearServicio,
    listaServicios,
    servicioInfo, 
    actualizarServicio,
    eliminarServicio

} = require('../controllers/servicio.controller');

/**
 * Ruta que crea un servicio.
 */
router.post('/nuevo', crearServicio);

/**
 * Ruta que muestra todos los servicios.
 */
router.get('/lista', listaServicios);

/**
 * Ruta que muestra la información de un servicio.
 */
router.get('/info', servicioInfo);

/**
 * Ruta que actualiza un servicio.
 */
router.post('/actualizar', actualizarServicio);

/**
 * Ruta que elimina un servicio.
 */
router.post('/eliminar', eliminarServicio);

module.exports = router;