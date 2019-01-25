const { SchemaDirectiveVisitor, ForbiddenError } = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');

// 2. Directive 实现
export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 2-1. ovveride field Definition 的實作
    const { resolve = defaultFieldResolver } = field;
    // 2-2. 更改 field 的 resolve function
    field.resolve = async function(...args) {
      const context = args[2];
      if (!context.me) throw new ForbiddenError('not login in~');
      // 确定有 context.me 后才会进入 resolve function
      const result = await resolve.apply(this, args);
      return result;
    };
  }
}

export class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 2-1. ovveride field Definition 的實作
    const { resolve = defaultFieldResolver } = field;
    // 2-2. 更改 field 的 resolve function
    field.resolve = async function(...args) {
      const context = args[2];
      if (!context.me) throw new ForbiddenError('not login in~');
      // 0 ==> 管理员
      if (context.me.type === 0) {
        // 确定有 context.me 后才会进入 resolve function
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new ForbiddenError('not admin');
      }
    };
  }
}
