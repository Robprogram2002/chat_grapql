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

  type Messege {
    uuid: String!
    content: String!
    from: String!
    createdAt: String!
    to: String!
  }

  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Messege]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    sendMessage(to: String!, content: String!): Messege!
  }
`;
