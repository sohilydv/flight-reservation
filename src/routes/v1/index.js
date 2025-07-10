const express = require('express');
const router = express.Router();
const { info_controller, about_controller } = require('../../controllers');

router.get('/info', info_controller);
router.get('/about', about_controller);

module.exports = router;