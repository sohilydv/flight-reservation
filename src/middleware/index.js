module.exports = {
  airplaneMiddleware: require("./validate-airplane-request"),
  cityMiddleware: require('./validate-city-request'),
  airportMiddleware: require('./validate-airport-request'),
  flightMiddleware: require('./validate-flight-request')
};
