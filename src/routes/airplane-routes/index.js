const express = require("express");
const router = express.Router();
const airplane_controller = require("../../controllers/airplane-controller");
const airplaneMiddleware = require("../../middleware").airplaneMiddleware;
router.post("/", airplaneMiddleware.validateCreateAirplaneRequest, airplane_controller.createAirplane);
router.get("/:id", airplane_controller.getAirplane);
router.get("/", airplane_controller.getAllAirplane);
router.delete("/:id", airplane_controller.deleteAirplane);
router.patch("/:id", airplaneMiddleware.validateUpdateAirplaneRequest, airplane_controller.updateAirplane)
module.exports = router;