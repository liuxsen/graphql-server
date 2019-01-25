// 店铺模型
import { Schema } from '../connect';
import { Model } from '../connect';

export const ShopSchema = new Schema({
  name: { type: String },
  address: { type: String },
  isHead: { type: Boolean }, // 是否总店
  ownerId: { type: Schema.Types.ObjectId },
  storePhone: { type: String }, // 店铺电话
});

export let ShopModel = Model('Shop', ShopSchema);
