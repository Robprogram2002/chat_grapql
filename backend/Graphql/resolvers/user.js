const { UserInputError } = require("apollo-server");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    getUsers: async () => {
      const users = await User.findAll();
      return users;
    },
  },

  Mutation: {
    register: async (
      _,
      { username, password, confirmPassword, email },
      context
    ) => {
      try {
        const userByUsername = await User.findOne({
          where: { username: username },
        });
        const userByEmail = await User.findOne({ where: { email: email } });
        console.log(userByUsername);
        if (userByEmail !== null || userByUsername !== null) {
          throw new UserInputError(
            "This credentail already exist, please choose other"
          );
        }

        const hash_password = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          username,
          password: hash_password,
          email,
        });
        console.log(newUser);
        return newUser;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
};
