import * as Koa from 'koa';
const fp = require('find-free-port');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

fp(4000)
  .then(([port]) => {
    console.log(process.env.NODE_ENV);
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
