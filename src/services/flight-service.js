const Flight = require("../models").Flight; // ✅ Import from centralized model init
const FlightRepository = require("../repository/flight-repository");
const { StatusCodes } = require("http-status-codes");
const flightRepository = new FlightRepository(Flight);
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
async function createFlight(flightData) {
  try {
    const response = await flightRepository.create(flightData);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      console.log(explaination);
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const response = await flightRepository.get(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("No flight found", error.statusCode);
    }
    throw new AppError(
      "Error occured while fetching data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// http://localhost:3000/api/v1/flight/
// ?trips=MUB-DEL&tripDate=2025-07-20&travellers=2&price=2000&sort=price_ASC

async function getAllFlight(query) {
  let customFilter = {}; // json
  let sortFilter = []; //array of mapped values
  const endingTripTime = " 23:59:00";
  // trips=MUM-DEL
  if(query.trips) {
       
       [departureAirportId, arrivalAirportId] = query.trips.split("-"); 
       customFilter.departureAirportId = departureAirportId;
       customFilter.arrivalAirportId = arrivalAirportId;
       // TODO: safety check to check arrival and depature airport shouldn't be same
    }
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
  console.log(customFilter, sortFilter);
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    console.log("error occured at flight service catch block, error: " + error);
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteFlight(id) {
  try {
    const response = await flightRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested flight to delete",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while deleting the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateFlight(id, data) {
  try {
    const response = await flightRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested flight to update",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while upadting the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
  createFlight,
  getFlight,
  getAllFlight,
  deleteFlight,
  updateFlight,
  updateSeats,
};

/*


*/
