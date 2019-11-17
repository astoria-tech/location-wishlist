const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const sequelize = require("./models").sequelize;
const models = require("./models").models;

const PORT = process.env.PORT || 3000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    locations: [Location]
    location(address: String!): Location
  }

  type Location {
    address: String
    suggestions: [Suggestion]
  }

  type Suggestion {
    idea: String!
    votes: Int
  }

  type Mutation {
    addLocation(address: String!): Boolean
    addIdea(address: String!, idea: String!): Boolean
    upVote(address: String!, idea: String!): Int
    downVote(address: String!, idea: String!): Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    locations: async (parent, args, { models }) => {
      return await models.Location.findAll({
        include: [models.Suggestion]
      });
    },
    location: async (parent, args, { models }) => {
      return await models.Location.findOne({
        where: {
          address: args.address
        },
        include: [models.Suggestion]
      });
    }
  },
  Mutation: {
    addLocation: async (parent, args, { models }) => {
      const { address } = args;
      if (address.trim() == "") {
        throw "Address can't be empty string";
      }
      const [location, created] = await models.Location.findOrCreate({
        where: {
          address
        },
        defaults: {
          address
        }
      });
      return created;
    },
    addIdea: async (parent, args, { models }) => {
      const { address, idea } = args;
      if (address.trim() == "") {
        throw "Address can't be empty string";
      }
      if (idea.trim() == "") {
        throw "Idea can't be empty string";
      }
      const [suggestion, created] = await sequelize
        .transaction(t => {
          return models.Location.findOne(
            {
              where: {
                address
              }
            },
            { transaction: t }
          ).then(location => {
            return models.Suggestion.findOrCreate({
              where: {
                idea,
                locationId: location.id
              },
              defaults: {
                idea,
                locationId: location.id,
                votes: 0
              }
            });
          });
        })
        .catch(console.error);
      return created;
    },
    upVote: async (parent, args, { models }) => {
      const { address, idea } = args;

      return await sequelize
        .transaction(t => {
          return models.Suggestion.findOne(
            {
              where: {
                idea
              },
              include: [
                {
                  model: models.Location,
                  where: {
                    address
                  }
                }
              ]
            },
            { transaction: t }
          ).then(async suggestion => {
            if (!suggestion) {
              throw "Not found";
            }
            suggestion.votes++;
            await suggestion.save();
            return suggestion.votes;
          });
        })
        .catch(console.error);
    },
    downVote: async (parent, args, { models }) => {
      const { address, idea } = args;

      return await sequelize
        .transaction(t => {
          return models.Suggestion.findOne(
            {
              where: {
                idea
              },
              include: [
                {
                  model: models.Location,
                  where: {
                    address
                  }
                }
              ]
            },
            { transaction: t }
          ).then(async suggestion => {
            if (!suggestion) {
              throw "Not found";
            }
            suggestion.votes--;
            await suggestion.save();
            return suggestion.votes;
          });
        })
        .catch(console.error);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
});

const app = express();
server.applyMiddleware({ app });

sequelize.sync().then(async () => {
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
});
