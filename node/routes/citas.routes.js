var express = require('express');
const router = express.Router();

const {
    crearCita,
    citasLista,
    citaInfo,
    actualizarCita,
    eliminarCita

} = require('../controllers/citas.controller');

/**
 * Ruta que crea una cita.
 */
router.post('/nuevo', crearCita);

/**
 * Ruta que muestra todas las citas.
 */
router.get('/lista', citasLista);

/**
 * Ruta que muestra la información de una cita.
 */
router.get('/info', citaInfo);

/**
 * Ruta que actualiza una cita.
 */
router.post('/actualizar', actualizarCita);

/**
 * Ruta que elimina una cita.
 */
router.post('/eliminar', eliminarCita);

module.exports = router;