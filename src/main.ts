import * as Koa from 'koa';
const fp = require('find-free-port');
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
const path = require('path');
const mongoose = require('./db/connect');
import * as Model from './db/schemas';
import { verify } from 'jsonwebtoken';
import { AuthConfig } from './config';

import { allResolvers } from './resolvers';

const { ApolloServer, gql } = require('apollo-server-koa');
// 加载指令
import {
  UpperCaseDirective,
  AuthDirective,
  AdminDirective,
} from './directives';

const typeDefs = importSchema(
  path.join(__dirname, `./typeDefs/schema.graphql`)
);
console.log(typeDefs);
const resolvers = allResolvers;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  // 將 schema 的 directive 與實作連接並傳進 ApolloServer。
  schemaDirectives: {
    upper: UpperCaseDirective as any,
    auth: AuthDirective as any,
    admin: AdminDirective as any,
  },
});

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
    };
  },
  // async context({ req, h }) {
  //   const token = req && req.headers && req.headers.token;
  //   if (token) {
  //     const data: any = jwt.verify(token, config.token.secret);
  //     const user = data.id ? await User.findById(data.id) : null;
  //     return { user };
  //   } else {
  //     return {};
  //   }
  // },
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
