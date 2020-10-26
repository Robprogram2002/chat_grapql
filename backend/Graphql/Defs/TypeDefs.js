const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    password: String!
    imageUrl: String!
    createdAt: String!
    updatedAt: String!
    id: ID!
    token: String
  }

  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;
