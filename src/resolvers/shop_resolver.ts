import * as _ from 'lodash';
import { ShopModel, UserModel } from '../db/schemas';

type ShopModelType = typeof ShopModel;

export default {
  Query: {
    async shop(parent, { id }, context) {
      const ShopModel: ShopModelType = context.ShopModel;
      return await ShopModel.findById(id);
    },
    async shops(parent, { page_no, page_limit }, context) {
      console.log(page_limit, page_no);
      const ShopModel: ShopModelType = context.ShopModel;
      // return ShopModel.find({});
      const skip = page_limit * (page_no - 1);
      const rows = await ShopModel.find({})
        .limit(page_limit)
        .skip(skip);
      const total_items = await ShopModel.countDocuments({});
      console.log(rows, total_items);
      return {
        page_limit,
        page_no,
        total_items,
        rows,
      };
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
