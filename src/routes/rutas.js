const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crear_modelo');
const { crearTablas } = require('../controllers/carga_temporal');
const { borrarmodel } = require('../controllers/borrar_database');
const { consulta1 } = require('../controllers/consulta1');
const { consulta2 } = require('../controllers/consulta2');
const { consulta3 } = require('../controllers/consulta3');
const { consulta4 } = require('../controllers/consulta4');
const { consulta5 } = require('../controllers/consulta5');
const { consulta6 } = require('../controllers/consulta6');
const { consulta7 } = require('../controllers/consulta7');
const { consulta8 } = require('../controllers/consulta8');
const { consulta9 } = require('../controllers/consulta9');
const { consulta10 } = require('../controllers/consulta10');
const { consulta11 } = require('../controllers/consulta11');

router.get('/borrarmodelo',borrarmodel);
router.get('/crearmodelo', modelo );
router.get('/cargamasiva', crearTablas );
router.get('/consulta1', consulta1 );
router.get('/consulta2', consulta2 );
router.get('/consulta3', consulta3 );
router.get('/consulta4', consulta4 );
router.get('/consulta5', consulta5 );
router.get('/consulta6', consulta6 );
router.get('/consulta7', consulta7 );
router.get('/consulta8', consulta8 );
router.get('/consulta9', consulta9 );
router.get('/consulta10', consulta10 );
router.get('/consulta11', consulta11 );

module.exports = router;