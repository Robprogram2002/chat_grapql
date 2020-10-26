const { gql, ApolloServer } = require("apollo-server");

const resolvers = require("./Graphql/resolvers/user");
const typeDefs = require("./Graphql/Defs/TypeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server runing on ${url}`);
});
