const { ApolloServer } = require("apollo-server");
const sequelize = require("./database/index");
const resolvers = require("./Graphql/resolvers/index");
const typeDefs = require("./Graphql/Defs/TypeDefs");
const contextMiddleware = require("./util/contextMiddleware");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`server runing on ${url}`);
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });
