import express from "express";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";

import passportConfig from "./config/passport";
import { typeDefs, resolvers } from "./schema";
import "./db";

const app = express();

// Passport Use Config
passportConfig(passport);

// Passport Middleware
app.use(passport.initialize());

// Passport Authenticate Middleware
app.use((req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user
  })
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
