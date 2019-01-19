import * as _ from 'lodash';
const users = [
  {
    id: 1,
    name: '张三',
    age: 23,
  },
  {
    id: 2,
    name: '李四',
    age: 35,
  },
];

export default {
  Query: {
    async user(parent, { id }) {
      return _.find(users, { id });
    },
    async users() {
      return users;
    },
  },
  Mutation: {
    addUser(parent, { userInput }) {
      userInput.id = users.length;
      users[users.length] = userInput;
      return userInput;
    },
    deleteUser(parent, { id }) {
      const user = _.find(users, { id });
      _.remove(users, { id });
      return user;
    },
    updateUser(parent, { updateUserInput }) {
      const index = _.findIndex(users, { id: updateUserInput.id });
      users[index] = updateUserInput;
      return users[index];
    },
  },
};
