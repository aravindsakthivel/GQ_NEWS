const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User!
  }

  type Mutation {
    authUser(fields: AuthInput!): User!
    signUp(fields: AuthInput!): User!
  }

  input AuthInput {
    email: String!
    password: String!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
  }
`;

module.exports = { typeDefs };
