import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "dotenv";

import models from "../models";

config({ path: "variables.env" });

const { SECRET } = process.env;
const options = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default passport => {
  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      /**
       * Find user by ID
       * (password) not included in the result
       */
      const user = await models.User.findById(jwt_payload._id, {
        password: 0
      });

      if (!user) return done(null, false);

      return done(null, user);
    })
  );
};
