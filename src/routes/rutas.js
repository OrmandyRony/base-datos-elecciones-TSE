const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crear_modelo');
const { crearTablas } = require('../controllers/carga_temporal');
const { borrarmodel } = require('../controllers/borrar_database');
const { consulta1 } = require('../controllers/consulta1');

router.get('/borrarmodelo',borrarmodel);
router.get('/crearmodelo', modelo );
router.get('/cargamasiva', crearTablas );
router.get('/consulta1', consulta1 );


module.exports = router;