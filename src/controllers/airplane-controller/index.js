const airplaneService = require("../../services/airplane-service");

const createAirplane = async function createAirplane(req, res) {
  console.log("request recvied at airplane_controller createAirplane");
  console.log("request body is: ", req.body);
  console.log("request body's modelNumber: ", req.body.modelNumber);
  console.log("request body's capacity: ", req.body.capacity);
  try {
    const airplane = await airplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    console.log("request response success from airplane_controller");
    return res.json({
      msg: "ok",
      success: true,
      error: "",
      data: airplane,
    });
  } catch (error) {
    console.log("error occured while create airplane airplane_controller, error: " + error);
    return res.json({
      msg: "error occured while creating airplane",
      success: false,
      error: error,
      data: [],
    });
  }
};

const getAirplane = async function getAirplane(req, res) {
  console.log("request recvied at airplane_controller getAirplane");
  console.log("request param id is: ", req.params.id);
  try {
    const airplane = await airplaneService.getAirplane(req.params.id);
    console.log("request response success from airplane_controller getAirplane");
    return res.json({
      msg: "ok",
      success: true,
      error: "",
      data: airplane,
    });
  } catch (error) {
    console.log("error occured while create airplane airplane_controller getAirplane, error: " + error);
    return res.json({
      msg: "error occured while getAirplane for id: " + id,
      success: false,
      error: error,
      data: [],
    });
  }
};

const getAllAirplane = async function getAllAirplane(req, res) {
  console.log("request recvied at airplane_controller getAllAirplane");
  try {
    const airplanes = await airplaneService.getAllAirplane();
    console.log("request response success from airplane_controller getAllAirplane");
    return res.json({
      msg: "ok",
      success: true,
      error: "",
      data: airplanes,
    });
  } catch (error) {
    console.log("error occured while create airplane airplane_controller getAllAirplane, error: " + error);
    return res.json({
      msg: "error occured while getAllAirplane",
      success: false,
      error: error,
      data: [],
    });
  }
};


module.exports = {createAirplane, getAirplane, getAllAirplane};
