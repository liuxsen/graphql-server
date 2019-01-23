## 参考资料

- [graphql doc 生成文档](https://github.com/2fd/graphdoc)
- [graphql-import](https://www.npmjs.com/package/graphql-import)
- [graphql-import doc](https://oss.prisma.io/content/graphql-import/overview)
- [ts-node](https://github.com/TypeStrong/ts-node)
- [Oh-My-Zsh 操作 Git 的快捷键](https://segmentfault.com/a/1190000007145316)
- [node 怎么判断是开发环境还是生产环境？？](https://segmentfault.com/q/1010000007782377/a-1020000007782650)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [mongoose 学习笔记（超详细）](https://segmentfault.com/a/1190000010688972#articleHeader14)
- [dataloader](https://www.npmjs.com/package/dataloader)

## 项目搭建流程

- [x] 启动 ts 项目，watch 自动重启
- [x] `findPoint` 启动项目 防止端口冲突
- [x] 判断环境
- [x] 接入 `graphql`
- [x] 使用 `.graphql` 文件 支持语法高亮
- [x] `npm run build` `.graphql` 文件处理
- [x] `.graphql` 单文件涵盖所有的 类型
- [x] 接入 `mongodb`
- [x] `mongodb model` 模型添加类型 typeof
- [x] 查看 `graphql性能`
- [x] relationship
- [x] [graphql 单文件注释](https://github.com/prisma/graphql-import/issues/49)
- [ ] 指令
- [x] 内联片段
- [ ] 在内联片段中使用变量
- [ ] 元字段
- [x] 分页
- [x] `dataloader`
- [ ] `auth`
- [ ] 文件上传
- [ ] 项目 日志
- [ ] subscription

## Useage

- `npm run dev`
- `npm run build`

query

![](./imgs/1.png)
![](./imgs/5.png)

mutation

** 新增 **
![](./imgs/2.png)
![](./imgs/3.png)
![](./imgs/4.png)

** 删除 **
![](./imgs/6.png)
![](./imgs/7.png)

** 更新 **
![](./imgs/8.png)
![](./imgs/9.png)

** 添加多个 schema **
![](./imgs/10.png)

# docker 启动 mongo 容器

- docker-compose up -d
- docker ps

# 连接 mongo

## 查询

```graphql
# Write your query or mutation here
query {
  user(_id: "5c44396542389ec9c640dd7b") {
    name
    age
    _id
  }
  users {
    name
    age
    _id
  }
}
```

```json
{
  "data": {
    "user": {
      "name": "update_user_name",
      "age": 244,
      "_id": "5c44396542389ec9c640dd7b"
    },
    "users": [
      {
        "name": "update_user_name",
        "age": 244,
        "_id": "5c44396542389ec9c640dd7b"
      },
      {
        "name": "赵柳",
        "age": 23,
        "_id": "5c443b3740bda6ca3ccd4efd"
      }
    ]
  }
}
```

### 查询片段 fragmentUser

```graphql
query getUserInfo {
  userInfo: user(_id: "5c44396542389ec9c640dd7b") {
    ...fragmentUser
  }

  users {
    name
    age
    _id
  }
}

fragment fragmentUser on User {
  name
}
```

### 指令 directives

```graphql
# Write your query or mutation here
query getUserInfo($showShops: Boolean!, $showName: Boolean!) {
  userInfo: user(_id: "5c44396542389ec9c640dd7b") {
    ...fragmentUser
    shops @include(if: $showShops) {
      name @skip(if: $showName)
      ownerId
      owner {
        name
        _id
      }
    }
  }
  users {
    name
    age
    _id
  }
}

fragment fragmentUser on User {
  name
}
```

## 分页

```graphql
query {
  shops(page_no: 1, page_limit: 1) {
    total_items
    page_no
    page_limit
    rows {
      name
      ownerId
      owner {
        name
      }
    }
  }
}
```

### 删除无用的 docker 镜像

- docker system prune -a --force
