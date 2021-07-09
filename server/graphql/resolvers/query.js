const { User } = require("../../models/user");
const { UserInputError, AuthenticationError } = require("apollo-server-express");
const { authorize } = require("../../utils/isAuth");

const Query = {
  hello: async (parent, args) => {
    return "hello back";
  },
  user: async (parent, args, context) => {
    try {
      const req = authorize(context.req)
      const user = await User.findOne({ _id: args.id });
      if (req._id.toString() !== user._id.toString()) {
        throw new AuthenticationError("You don't own this user")
      }
      return user;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { Query };
