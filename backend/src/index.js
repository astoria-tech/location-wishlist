const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const sequelize = require('./models').sequelize;
const models = require('./models').models;

const PORT = process.env.PORT || 3000

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    locations: [Location]
  }

  type Location {
      address: String
      votes: Int
  }

  type Mutation {
      addLocation(address: String!): Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    locations: async (parent, args, { models }) => {
        console.log(models);
        return await models.Location.findAll();
    }
  },
  Mutation: {
      addLocation: async (parent, args, { models }) => {
          const { address } = args;
          if (address.trim() == '') {
            throw "Address can't be empty string"
          }
          const [location, created] = await models.Location.findOrCreate({
              where: {
                  address
              },
              defaults: {
                  address,
                  votes: 0
              }
          });
          return created;
      }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: {
    models
} });

const app = express();
server.applyMiddleware({ app });


sequelize.sync().then(async () => {
    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
});