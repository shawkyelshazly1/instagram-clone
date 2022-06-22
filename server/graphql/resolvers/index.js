const authResolver = require("./auth");

const resolvers = {
  Query: {
    async testQuery(_, __, ctx) {
      return "Hello from GraphQL";
    },
  },
  Mutation: {
    ...authResolver.Mutation,
  },
};

module.exports = resolvers;
