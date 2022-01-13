const { ApolloServer, gql } = require('apollo-server');
const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const me = models.users[0];


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      models: models
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

