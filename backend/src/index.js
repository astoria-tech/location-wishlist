const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const sequelize = require("./models").sequelize;
const models = require("./models");

const PORT = process.env.PORT || 3000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    locations: [Location]
    approvedLocations: [Location]
    submittedLocations: [Location]
    location(id: String!): Location
  }

  type Location {
    id: String
    address: String
    imageURL: String
    approved: Boolean
    createdAt: String
    updatedAt: String
    Suggestions: [Suggestion]
  }

  type Suggestion {
    idea: String!
    votes: Int
  }

  type Mutation {
    addLocation(address: String!, photo: Upload!): Boolean
    approveLocation(id: String!): Boolean
    rejectLocation(id: String!): Boolean
    addIdea(id: String!, idea: String!): Boolean
    upVote(id: String!, idea: String!): Int
    downVote(id: String!, idea: String!): Int
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
    approvedLocations: async (parent, args, { models }) => {
      return await models.Location.findAll({
        where: {
          approved: true
        },
        include: [models.Suggestion]
      });
    },
    submittedLocations: async (parent, args, { models }) => {
      return await models.Location.findAll({
        where: {
          approved: false
        },
        include: [models.Suggestion]
      });
    },
    location: async (parent, args, { models }) => {
      return await models.Location.findOne({
        where: {
          id: args.id
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

      console.log('DEBUG', args.photo);

      const [location, created] = await models.Location.findOrCreate({
        where: { address },
        defaults: { address }
      });

      return created;
    },
    addIdea: async (parent, args, { models }) => {
      const { id, idea } = args;
      if (id.trim() == "") {
        throw "Location ID can't be empty string";
      }
      if (idea.trim() == "") {
        throw "Idea can't be empty string";
      }
      const [suggestion, created] = await sequelize
        .transaction(t => {
          return models.Location.findOne(
            {
              where: {
                id
              }
            },
            { transaction: t }
          ).then(location => {
            return models.Suggestion.findOrCreate({
              where: {
                idea,
                LocationId: location.id
              },
              defaults: {
                idea,
                LocationId: location.id,
                votes: 0
              }
            });
          });
        })
        .catch(console.error);
      return created;
    },
    upVote: async (parent, args, { models }) => {
      const { id, idea } = args;

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
                    id
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
        const { id, idea } = args;

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
                      id
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
    },
    approveLocation: async (parent, args, { models }) => {
      const { id, idea } = args;
      return await sequelize
        .transaction(t => {
          return models.Location.findOne(
            {
              where: {
                id
              }
            },
            { transaction: t }
          ).then(async location => {
            location.approved = !location.approved;
            await location.save();
            return location.approved;
          });
        })
        .catch(console.error);
    },
    rejectLocation: async (parent, args, { models }) => {
      const { id, idea } = args;
      return await sequelize
        .transaction(t => {
          return models.Location.findOne(
            {
              where: {
                id
              }
            },
            { transaction: t }
          ).then(async location => {
            await location.destroy();
            return location.approved;
          });
        })
        .catch(console.error);
    },
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

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

const createLocations = async () => {
  await models.Location.create({
    address: "40-12 Broadway",
    approved: true
  });
  await models.Location.create({
    address: "29-10 Broadway",
    approved: true
  });
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
