const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Unauthenticated");
      const users = await User.findAll({
        // where: { username: { [Op.ne]: user.username } },
      });

      return users;
    },
    login: async (_, { username, password }) => {
      let errors = {};
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("User not found", { errors });
        }
        const correctPasswor = await bcrypt.compare(password, user.password);
        // if (!correctPasswor) {
        //   errors.password = "The password is incorrect";
        //   throw new AuthenticationError("The password is incorrect", {
        //     errors,
        //   });
        // }

        const token = jwt.sign(
          {
            username,
            id: user.id,
          },
          "ndjkasnjdnjkaskdmas",
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
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

        const hash_password = await bcrypt.hash(password, 6);

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
