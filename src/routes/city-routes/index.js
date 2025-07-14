const express = require("express");
const router = express.Router();
const city_controller = require("../../controllers/city-controller");
const cityMiddleware = require("../../middleware").cityMiddleware;
router.post("/", cityMiddleware.validateCreateCityRequest, city_controller.createCity);
router.get("/:id", city_controller.getCity);
router.get("/", city_controller.getAllCity);
router.delete("/:id", city_controller.deleteCity);
router.patch("/:id", cityMiddleware.validateUpdateCityRequest, city_controller.updateCity)
module.exports = router;