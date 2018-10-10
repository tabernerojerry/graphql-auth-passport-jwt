import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import models from "../models";
import {
  catchError,
  pushError,
  validateRegisterInput,
  validateLoginInput
} from "../validation";

export default {
  users: async user => {
    /**
     * throw Unauthorized error if user not exist
     */
    if (!user) {
      throw new Error("Unauthorized!");
    }

    /**
     * Display all users
     * (password) not included in the results
     */
    const users = await models.User.find({}, { password: 0 });

    return users;
  },
  /**
   * Register User
   */
  register: async input => {
    let errors = [];

    // Validate Register Form input
    const { isValid } = validateRegisterInput(errors, input);

    if (!isValid)
      return {
        ok: false,
        errors
      };

    try {
      // Find user input email
      // (_id, password) not included in the result
      const isUserExist = await models.User.findOne(
        { email: input.email },
        { _id: 0, password: 0 }
      );

      // Validate if user email already exist
      if (isUserExist) {
        // Push error message to errors Array
        pushError(errors, "email", "Email is already taken!");

        return {
          ok: false,
          errors
        };
      }

      // Hash password
      const hashPassword = await bcrypt.hash(input.password, 10);

      // Create User
      const user = await models.User.create({
        ...input,
        password: hashPassword
      });

      // Finally return user
      return {
        ok: true,
        user
      };
    } catch (e) {
      /**
       * Catch DB Errors
       * @errors: Array
       * @e.errors: Object
       */
      return catchError(errors, e.errors);
    }
  },
  /**
   * Login User
   */
  login: async input => {
    let errors = [];

    // Validate Login Form input
    const { isValid } = validateLoginInput(errors, input);

    if (!isValid)
      return {
        ok: false,
        errors
      };

    // Find user email
    const user = await models.User.findOne({ email: input.email });

    // Validate if user exist
    if (!user) {
      pushError(errors, "email", "User not found!");

      return {
        ok: false,
        errors
      };
    }

    // Compare User Password
    const isMatch = await bcrypt.compare(input.password, user.password);

    // Validate if user password match
    if (!isMatch) {
      pushError(errors, "password", "Password is Invalid!");

      return {
        ok: false,
        errors
      };
    }

    // jwt payload
    const payload = { _id: user._id, email: user.email };

    // Secret Key
    const { SECRET } = process.env;

    // Create Token Expires in 1 hour
    const token = await jwt.sign(payload, SECRET, {
      expiresIn: 3600
    });

    // Finally return user token
    return {
      ok: true,
      token //: `Bearer ${token}`
    };
  }
};
