import * as _ from 'lodash';
import { UserModel, ShopModel } from '../db/schemas';
import { shopLoader } from './dataLoader';
import { sign } from 'jsonwebtoken';
import { AuthConfig } from '../config';
import * as bcrypt from 'bcryptjs';

type TypeUserModel = typeof UserModel;

export default {
  Query: {
    async user(parent, { _id }, context) {
      const UserModel: TypeUserModel = context.db.UserModel;
      return await UserModel.findById(_id);
    },
    async users(parent, { _id }, context) {
      const UserModel: TypeUserModel = context.db.UserModel;
      return await UserModel.find({});
    },
  },
  Mutation: {
    async login(parent, { name, pwd }: { name: string; pwd: string }, context) {
      const user: any = await UserModel.findOne({ name });
      // 对比密码 pwd 用户密码  user.pwd 数据库密码
      const isEqualPwd = bcrypt.compareSync(pwd, user.pwd);
      if (isEqualPwd) {
        const token = sign(user.toJSON(), AuthConfig.secret, {
          expiresIn: AuthConfig.exp,
        });
        return {
          token,
          message: 'login successfully',
        };
      } else {
        return {
          token: '',
          message: 'pwd is invalide',
        };
      }
    },
    async addUser(parent, { userInput }: { userInput: any }, context) {
      const UserModel: TypeUserModel = context.db.UserModel;
      // 账户唯一
      const dbUser = await UserModel.findOne({ name: userInput.name });
      if (dbUser) {
        return {
          token: '',
          message: 'already has this username',
        };
      }
      const salt = bcrypt.genSaltSync(10);
      const newPwd = bcrypt.hashSync(userInput.pwd, salt);
      userInput.pwd = newPwd;
      const user = await UserModel.create(userInput);
      const token = sign(user.toJSON(), AuthConfig.secret, {
        expiresIn: AuthConfig.exp,
      });
      return {
        token,
        message: 'register Successfully',
      };
    },
    async deleteUser(parent, { _id }, context) {
      return await context.db.UserModel.findByIdAndDelete(_id);
    },
    async updateUser(parent, { updateUserInput }, context) {
      const modifiedLength = await context.db.UserModel.updateOne(
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
