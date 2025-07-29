const express = require("express");
const router = express.Router();
const flight_controller = require("../../controllers/flight-controller");
const flightMiddleware = require("../../middleware").flightMiddleware;
router.post("/", flightMiddleware.validateCreateFlightRequest, flight_controller.createFlight);
router.get("/:id", flight_controller.getFlight);
router.get("/", flight_controller.getAllFlight);
router.delete("/:id", flight_controller.deleteFlight);
router.patch("/:id", flightMiddleware.validateUpdateFlightRequest, flight_controller.updateFlight)
router.patch(
        '/:id/seats', 
        flightMiddleware.validateUpdateSeatsRequest,
        flight_controller.updateSeats
);
module.exports = router;