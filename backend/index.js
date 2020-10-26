const { ApolloServer } = require("apollo-server");
const sequelize = require("./database/index");
const resolvers = require("./Graphql/resolvers/user");
const typeDefs = require("./Graphql/Defs/TypeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
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
