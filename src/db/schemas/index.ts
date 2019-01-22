import { Model } from '../connect';
import { UserSchema } from './user';
import { ShopSchema } from './shop';

export const UserModel = Model('User', UserSchema);
export const ShopModel = Model('Shop', ShopSchema);
