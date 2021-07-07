const Query = {
  hello: async (parent, args) => {
    return "hello back";
  },
};

module.exports = { Query };
