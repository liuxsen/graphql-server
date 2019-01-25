import * as _ from 'lodash';
import UserResolver from './user_resolver';
import ShopResolver from './shop_resolver';
import PageInfo from './common';

const resovers = _.merge(UserResolver, ShopResolver, PageInfo);

export const allResolvers = resovers;
