const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crear_modelo');
const { crearTablas } = require('../controllers/carga_temporal');
const { borrarmodel } = require('../controllers/borrar_database');

router.get('/borrarmodelo',borrarmodel);
router.get('/crearmodelo', modelo );
router.get('/cargatempdepartamentos', crearTablas );


module.exports = router;