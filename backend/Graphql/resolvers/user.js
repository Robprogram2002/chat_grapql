const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, "ndjkasnjdnjkaskdmas", (err, decodedToken) => {
          if (err) {
            throw new UserInputError(err);
          }
        });

        const users = await User.findAll();
        return users;
      } else {
        throw new UserInputError("Must be provided a user token header");
      }
    },
    login: async (_, { email, password }) => {
      let errors = {};
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          errors.email = "user not found";
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
            email,
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
