const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const sequelize = require("./models").sequelize;
const models = require("./models").models;

const PORT = process.env.PORT || 3000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    locations: [Location]
    acceptedLocations: [Location]
    submittedLocations: [Location]
    location(address: String!): Location
  }

  type Location {
    address: String
    createdAt: String
    isAccepted: Boolean
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
    acceptedLocations: async (parent, args, { models }) => {
      return await models.Location.findAll({
        where: {
          isAccepted: true
        },
        include: [models.Suggestion]
      });
    },
    submittedLocations: async (parent, args, { models }) => {
      return await models.Location.findAll({
        where: {
          isAccepted: false
        },
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
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createLocations();
  }
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
});

const createLocations = async () => {
  await models.Location.create(
    {
      address: "40-12 Broadway",
      isAccepted: true
    }
  )
  await models.Location.create(
    {
      address: "29-10 Broadway",
      isAccepted: true
    }
  )
  await models.Location.create(
    {
      address: "29-34 38th Street"
    }
  )
  await models.Location.create(
    {
      address: "40-20 Steinway Street"
    }
  )
  await models.Location.create(
    {
      address: "32-13 Broadway"
    }
  )
}