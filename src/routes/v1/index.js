const express = require('express');
const router = express.Router();
const { info_controller, about_controller, airplane_controller } = require('../../controllers');
const airplaneRouter = require('../airplane-routes');
const cityRouter = require('../city-routes');
const airportRouter = require('../airport-routes');
const flightRouter = require('../flight-routes');
router.use('/airplane', airplaneRouter);
router.use('/city', cityRouter);
router.use('/airport', airportRouter);
router.use('/flight', flightRouter);
router.get('/info', info_controller);
router.get('/about', about_controller);

module.exports = router;