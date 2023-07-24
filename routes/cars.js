const express = require('express');
const router = express.Router();
const Cars = require('../controllers/Cars');

router.get('/', Cars.getListCars)
router.get('/logs', Cars.getLogs)
router.post('/createCar', Cars.createCar)

module.exports = router;
