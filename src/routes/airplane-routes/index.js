const express = require("express");
const router = express.Router();
const airplane_controller = require("../../controllers/airplane-controller");
const middleware = require("../../middleware");
router.post("/", middleware.validateRequest, airplane_controller.createAirplane);
router.get("/:id", airplane_controller.getAirplane);
router.get("/", airplane_controller.getAllAirplane);
router.delete("/:id", airplane_controller.deleteAirplane);
module.exports = router;