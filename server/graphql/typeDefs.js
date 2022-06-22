const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    avatar: String!
    posts: [Post!]
    followersCount: Int!
    followingsCount: Int!
  }
  type Post {
    id: ID!
    image: String!
    caption: String!
    author: User!
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }

  type Query {
    testQuery: String!
  }

  type Mutation {
    # register mutation
    register(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Boolean!

    # login mutation
    login(username: String!, password: String!): LoginResponse!
  }
`;

module.exports = typeDefs;
