import * as _ from 'lodash';
import UserResolver from './user_resolver';
import ShopResolver from './shop_resolver';

const resovers = _.merge(UserResolver, ShopResolver);

export const allResolvers = resovers;
