const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crear_modelo');


router.get('/crearmodelo', modelo )



module.exports = router;