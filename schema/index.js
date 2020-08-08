const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

module.exports = gql`
  scalar JSON

  type trainStation {
    name: String!
    crs: String!
  }
  type callingPoint {
    trainStation: trainStation!
    duetime: String!
    etORat: String!
    noOfCarriages: Int
  }

  type service {
    serviceID: ID!
    dueTime: String!
    etaORetd: String
    noOfCarriages: Int
    platform: String
    origin: trainStation
    destination: trainStation
    callingPoints: [callingPoint]
    isDelayed: Boolean!
    delayReason: String
    isCancelled: Boolean!
    cancelReason: String
    operator: String
  }

  type depatures {
    depatureStation: trainStation
    messages: [String]
    services: [service]
  }

  type Query {
    getDepartureBoard(
      depatureStation: String!
      alldepartures: Boolean!
      destinationLocation: String
      numberOfResults: Int
    ): depatures
    getTrainStationCrs: [trainStation]!
  }
`;
/*
getDepartureBoard
@depatureStation the station of which the depatures are required
@alldepartures if set to true, all the trains  departing from the depatureStation are returned
@alldepartures if set to false destinationLocation must be provided
@destinationLocation get the trains departing from the depatureStation to destinationLocation.
@destinationLocation only used if alldepartures is false
@startTimeInterval, @endTimeInterval: in minutes, depatures fetched from  @startTimeInterval to @endTimeInterval
@numberOfResults the number of result the client wants
*/
