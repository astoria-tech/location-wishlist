require("dotenv").config();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { AuthenticationError, UserInputError } = require("apollo-server");

const sequelize = require("./models").sequelize;
const models = require("./models");

const jwt = require("jsonwebtoken");

const createToken = async (user, secret, expiresIn) => {
  const { id, name, email } = user;
  return await jwt.sign({ id, name, email }, secret, {
    expiresIn,
  });
}

const PORT = process.env.PORT || 3000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    locations: [Location]
    users: [User!]
    approvedLocations: [Location]
    submittedLocations: [Location]
    location(id: String!): Location
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Token {
    token: String!
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
    addLocation(address: String!): Boolean
    approveLocation(id: String!): Boolean
    rejectLocation(id: String!): Boolean
    addIdea(id: String!, idea: String!): Boolean
    upVote(id: String!, idea: String!): Int
    downVote(id: String!, idea: String!): Int
    signUp(
      name: String!
      email: String!
      password: String!
    ): Token!
    signIn(login: String!, password: String!): Token!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
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
    signUp: async (
      parent,
      { name, email, password },
      { secret }
    ) => {
      if (name.trim() == "") {
        throw "Name field can't be empty";
      }
      if (email.trim() == "") {
        throw "Email field can't be empty";
      }
      if (password.trim() == "") {
        throw "Password field can't be empty"; }

      const user = await models.User.create({
        name,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },
    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this email.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, '30m') };
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
    models,
    secret: process.env.SECRET,
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