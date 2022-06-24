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
    followed: Boolean!
  }

  type Post {
    id: ID!
    image: String!
    caption: String!
    author: User!
    likesCount: Int!
    liked: Boolean!
    commentsCount: Int!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }

  type Query {
    testQuery: String!
    loadUserProfile(username: String!): User!
    currentUser: User!

    # loadpost query
    loadPost(postId: ID!): Post!
    loadUserPosts(userId: ID!): [Post!]
    loadNewsfeed: [Post!]
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

    # logout mutation
    logout: Boolean!

    # followOrUnfollowUser
    followOrUnfollowUser(username: String!): User!

    # post mutation
    createPost(image: String!, caption: String!): Post!
    deletePost(postId: ID!): Boolean!
    likeorUnlikePost(postId: ID!): Post!

    #comment mutation
    addComment(content: String!, postId: ID!): Comment!
    deleteComment(commentId: ID!): Boolean!
  }
`;

module.exports = typeDefs;
