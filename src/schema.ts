import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './typeDefs/**/*.gql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './resolvers/*'), {
  recursive: true,
  extensions: ['.ts'],
});
const resolvers = mergeResolvers(resolversArray);

// 加载指令
import {
  UpperCaseDirective,
  AuthDirective,
  AdminDirective,
} from './directives';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  // 將 schema 的 directive 與實作連接並傳進 ApolloServer。
  schemaDirectives: {
    upper: UpperCaseDirective as any,
    auth: AuthDirective as any,
    admin: AdminDirective as any,
  },
});
