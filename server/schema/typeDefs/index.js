import graphqlFileLoader from "../../utils/graphqlFileLoader";

export default [
  graphqlFileLoader("../schema/typeDefs/base.graphql"),
  graphqlFileLoader("../schema/typeDefs/error.graphql"),
  graphqlFileLoader("../schema/typeDefs/user.graphql")
];
