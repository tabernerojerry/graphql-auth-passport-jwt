import controller from "../../controllers";

export default {
  Query: {
    users: async (_, __, { user }) => await controller.user.users(user)
  },
  Mutation: {
    register: async (_, { input }) => await controller.user.register(input),

    login: async (_, { input }) => await controller.user.login(input)
  }
};
