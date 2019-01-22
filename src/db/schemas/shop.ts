// 店铺模型
import { Schema } from '../connect';

export const ShopSchema = new Schema({
  name: { type: String },
  address: { type: String },
  ownerId: { type: Schema.Types.ObjectId },
  storePhone: { type: String }, // 店铺电话
  isHead: { type: Boolean }, // 是否总店
});
