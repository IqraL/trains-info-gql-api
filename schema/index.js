const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

module.exports = gql`
  scalar JSON

  type Query {
    getDepartureBoard(
      depatureStation: String!
      startTimeInterval: Int!
      endTimeInterval: Int!
      alldepartures: Boolean!
      destinationLocation: String
      numberOfResults: Int
    ): JSON
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
