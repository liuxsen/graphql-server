import * as _ from 'lodash';
const shops = [
  {
    id: 1,
    name: 'shop-1',
    authorId: 1,
  },
  {
    id: 2,
    name: 'shop-2',
    authorId: 1,
  },
];

export default {
  Query: {
    shop(parent, { id }) {
      return _.find(shops, { id });
    },
  },
  Mutation: {
    addShop(parent, { shopInput }) {
      console.log(shopInput);
      shopInput.id = shops.length;
      shops[shops.length] = shopInput;
      return shopInput;
    },
  },
};
