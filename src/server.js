// In this file we set up our Node.js application, our GraphQL context to contain an instance of our in-memory database, our server GraphQL endpoint, and GraphQL playground endpoint. We then export our app as expected.

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");
const { startDatabase } = require("./database");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;

// Create a context for holding contextual data (db info in this case)
const context = async () => {
  const db = await startDatabase();

  return { db };
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context,
  })
);

//Graphql Playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
