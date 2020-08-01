const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

module.exports = gql`
  scalar JSON

  type Query {
    getDepartureBoard: JSON
  }
`;
