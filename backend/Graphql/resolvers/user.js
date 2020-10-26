module.exports = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: "Robert",
          email: "robert@martz.com",
        },
        {
          username: "David",
          email: "david@gerard.com",
        },
      ];

      return users;
    },
  },
};
