const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello World!"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,

  context: ({ req, res }) => ({}),
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
