import * as _ from 'lodash';
import { UserModel, ShopModel } from '../db/schemas';
import { shopLoader } from './dataLoader';

type TypeUserModel = typeof UserModel;

export default {
  Query: {
    async user(parent, { _id }, context) {
      const UserModel: TypeUserModel = context.UserModel;
      return await UserModel.findById(_id);
    },
    async users(parent, { _id }, context) {
      const UserModel: TypeUserModel = context.UserModel;
      return await UserModel.find({});
    },
  },
  Mutation: {
    async addUser(parent, { userInput }, context) {
      const UserModel: TypeUserModel = context.UserModel;
      return await UserModel.create(userInput);
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
  User: {
    async shops(user: { _id: String }) {
      return await shopLoader.load(user._id);
    },
  },
};
