const userResolvers = require("./user");
const messegeResolvers = require("./messege");

module.exports = {
  Messege: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...userResolvers.Query,
    ...messegeResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messegeResolvers.Mutation,
  },
};
