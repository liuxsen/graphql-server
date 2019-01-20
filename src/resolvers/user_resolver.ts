import * as _ from 'lodash';
import { UserModel } from '../db/schemas';
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
    users() {
      return users;
    },
  },
  Mutation: {
    async addUser(parent, { userInput }, context) {
      const User = new context.UserModel(userInput);
      await User.save();
      return User.transform();
    },
    async deleteUser(parent, { _id }, context) {
      return await context.UserModel.findByIdAndDelete(_id);
    },
    async updateUser(parent, { updateUserInput }, context) {
      const modifiedLength = await context.UserModel.updateOne(
        { _id: updateUserInput._id },
        updateUserInput
      );
      if (modifiedLength.n) {
        return updateUserInput;
      } else {
        return null;
      }
    },
  },
};
