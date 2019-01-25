const { SchemaDirectiveVisitor } = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');

// 2. Directive 實作
export class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 2-1. ovveride field Definition 的實作
    const { resolve = defaultFieldResolver } = field;
    // 2-2. 更改 field 的 resolve function
    field.resolve = async function(...args) {
      // 2-3. 取得原先 field resolver 的計算結果 (因為 field resolver 傳回來的有可能是 promise 故使用 await)
      const result = await resolve.apply(this, args);
      // 2-4. 將得到的結果再做預期的計算 (toUpperCase)
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      // 2-5. 回傳最終值 (給前端)
      return result;
    };
  }
}
