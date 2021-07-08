const { User } = require("../../models/user");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

const Mutation = {
  authUser: (parent, args) => {
    return true;
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
        throw new AuthenticationError("The email is duplicate use new one")
      }
      throw err;
    }
  },
};

module.exports = { Mutation };
