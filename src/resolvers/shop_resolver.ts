import * as _ from 'lodash';
import { ShopModel, UserModel } from '../db/schemas';

type ShopModelType = typeof ShopModel;

export default {
  Query: {
    async shop(parent, { id }, context) {
      const ShopModel: ShopModelType = context.ShopModel;
      return await ShopModel.findById(id);
    },
    async shops(parent, {}, context) {
      const ShopModel: ShopModelType = context.ShopModel;
      return ShopModel.find({});
    },
  },
  Mutation: {
    async addShop(parent, { shopInput }, context) {
      const ShopModel: ShopModelType = context.ShopModel;
      return await ShopModel.create(shopInput);
    },
  },
  Shop: {
    async owner(shop) {
      return await UserModel.findById(shop.ownerId);
    },
  },
};
