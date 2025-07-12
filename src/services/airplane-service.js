const { Airplane } = require("../models"); // ✅ Import from centralized model init
const AirplaneRepository = require("../repository/airplane-repository");

const airplaneRepository = new AirplaneRepository(Airplane);

async function createAirplane(airplaneData) {
  try {
    console.log("at createAirplane fun airplane-service");
    const response = await airplaneRepository.create(airplaneData);
    console.log("at createAirplane success at airplane-service");
    return response;
  } catch (error) {
    console.log("error at createAirplane at airplane-service, error: " + error);
    throw error;
  }
}

async function getAirplane(id) {
  try {
    console.log("at getAirplane fun airplane-service");
    const response = await airplaneRepository.get(id);
    console.log("at getAirplane success at airplane-service");
    return response;
  } catch (error) {
    console.log("error at getAirplane at airplane-service, error: " + error);
    throw error;
  }
}

async function getAllAirplane() {
  try {
    console.log("at getAllAirplane fun airplane-service");
    const response = await airplaneRepository.getAll();
    console.log("at getAllAirplane success at airplane-service");
    return response;
  } catch (error) {
    console.log("error at getAllAirplane at airplane-service, error: " + error);
    throw error;
  }
}

module.exports = { createAirplane, getAirplane, getAllAirplane };
