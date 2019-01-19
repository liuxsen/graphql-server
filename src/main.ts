import * as Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
