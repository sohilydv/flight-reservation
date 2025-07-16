const express = require("express");
const router = express.Router();
const airport_controller = require("../../controllers/airport-controller");
const airportMiddleware = require("../../middleware").airportMiddleware;
router.post("/", airportMiddleware.validateCreateAirportRequest, airport_controller.createAirport);
router.get("/:id", airport_controller.getAirport);
router.get("/", airport_controller.getAllAirport);
router.delete("/:id", airport_controller.deleteAirport);
router.patch("/:id", airportMiddleware.validateUpdateAirportRequest, airport_controller.updateAirport)
module.exports = router;