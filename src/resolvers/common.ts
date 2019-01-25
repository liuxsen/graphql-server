export default {
  PageInfo: {
    __resolveType(obj, context, info) {
      return 'pageInfo';
    },
  },
  UserType: {
    admin: 0,
    busiuness: 1,
  },
};
