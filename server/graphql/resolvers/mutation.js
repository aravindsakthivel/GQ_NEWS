const { User } = require("../../models/user");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

const Mutation = {
  authUser: async (parent, args) => {
    try {
      const user = await User.findOne({
        email: args.fields.email,
      });
      if (!user) {
        throw new AuthenticationError("Bad email");
      }
      const checkPass = await user.comparePassword(args.fields.password);
      if (checkPass) {
        return user;
      }

      const getToken = await user.generateToken();
      if (!getToken) {
        throw new AuthenticationError("Something went wrong, try again");
      }

      return { _id: user._id, email: user.email, token: getToken.token };
    } catch (err) {
      throw err;
    }
  },
  signUp: async (parent, args) => {
    try {
      const user = new User({
        email: args.fields.email,
        password: args.fields.password,
      });

      const getToken = await user.generateToken();
      if (!getToken) {
        throw new AuthenticationError("Something went wrong, try again");
      }

      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new AuthenticationError("The email is duplicate use new one");
      }
      throw err;
    }
  },
};

module.exports = { Mutation };
