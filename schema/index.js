const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

module.exports = gql`
  scalar JSON

  type cctv {
    location: String
    points: [Float]
  }
  type Library {
    name: String
    address: String
    postcode: String
    telepone: String
    points: [Float]
  }
  type railwayStation {
    name: String
    points: [Float]
  }
  type Query {
    getConservationAreas: JSON
    getCctvLocations: [cctv]
    getLibraries: [Library]
    getRailwayStations: [railwayStation]
  }
`;
