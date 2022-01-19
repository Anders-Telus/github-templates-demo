import {ApolloServer} from 'apollo-server';

// inspired from
// https://www.apollographql.com/docs/apollo-server/getting-started/

const createApolloServer = ( gateway ) => {

  // The ApolloServer constructor
  const server = new ApolloServer({ gateway });

  // we don't run server.listen() here. The server is not yet started.
  return server;
};

export default createApolloServer;