import * as Koa from 'koa';
const fp = require('find-free-port');
const { ApolloServer, gql, ForbiddenError } = require('apollo-server-koa');

const path = require('path');
const mongoose = require('./db/connect');
import * as Model from './db/schemas';
import { verify } from 'jsonwebtoken';
import { AuthConfig } from './config';
import schema from './schema';

const server = new ApolloServer({
  schema,
  formatError(error) {
    delete error.extensions.exception;
    return error;
  },

  async context({ ctx }) {
    console.log(ctx);
    const token = ctx.headers.token;
    let me = null;
    if (token) {
      try {
        me = verify(token, AuthConfig.secret);
      } catch (error) {}
    }
    return {
      db: Model,
      me,
      Forbidden: ForbiddenError,
    };
  },
  // 打开性能分析
  tracing: true,
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
