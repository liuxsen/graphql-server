import * as Koa from 'koa';
const fp = require('find-free-port');
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
const path = require('path');
const mongoose = require('./db/connect');
import * as Model from './db/schemas';

import { allResolvers } from './resolvers';

const { ApolloServer, gql } = require('apollo-server-koa');

const typeDefs = importSchema(path.join(__dirname, `./schemas/schema.graphql`));

const resolvers = {
  Query: {
    ...allResolvers.Query,
  },
  Mutation: {
    ...allResolvers.Mutation,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  formatError(error) {
    delete error.extensions.exception;
    return error;
  },
  async context({ req, h }) {
    return {
      ...Model,
    };
  },
});
const app = new Koa();

server.applyMiddleware({ app });

fp(4000)
  .then(([port]) => {
    if (process.env.NODE_ENV === 'production') {
      port = 3000;
    }
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
