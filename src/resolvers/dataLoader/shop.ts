import { UserModel, ShopModel } from '../../db/schemas';
import * as DataLoader from 'dataloader';

// loader shops 有外键 ids user => _id
const getShops = async function(ids) {
  // Model.find(props: {$in: []}); 查询多个
  const shops = await ShopModel.find({ ownerId: { $in: ids } });
  // 将id 变为 string id 类型默认为object
  // 过滤 返回的结果
  return ids.map(id =>
    shops.filter((shop: any) => shop.ownerId.toString() === id.toString())
  );
};

export const shopLoader = new DataLoader(ids => getShops(ids));
