const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const consola = require("consola");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs"),
  resolvers = require("./graphql/resolvers/index");
// setting dotenv env
require("dotenv").config();

(async () => {
  // init express app instance
  const app = express();

  // setting express batteries
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // setting Apollo server above express
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  // starting the apollo server
  await server.start();

  server.applyMiddleware({ app, cors: false });

  // connect mongoose
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => {
      consola.success(`Connection to MongoDB Success.`);
      app.listen(process.env.PORT, () => {
        consola.success(
          `Server started on : http://localhost:${process.env.PORT}`
        );
        consola.success(
          `Graphql playground connected & started on : http://localhost:${process.env.PORT}/graphql`
        );
      });
    })
    .catch((err) => {
      consola.error(`Connection to MongoDB Failed with Error: ${err}`);
    });
})();
