import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import passport from "passport";

export const userProfile = (req, res) => {
  res.send("User Profile");
};
export const getOrdersUser = (req, res) => {
  res.send("Get all orders from user");
};
export const getSpecificOrderUser = (req, res) => {
  res.send("Get Specific order from user");
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User doesn't exist")
      error.status = 404
      throw error
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      const error = new Error("Invalid password")
      error.status = 403
      throw error
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return next(error)
  }
};

export const createUser = [
  body("firstName", "First name required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters minimum")
    .escape(),
  body("lastName", "Last name required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be 3 characters minimum")
    .escape(),
  body("email", "Email required")
    .isEmail()
    .withMessage("Write an email address"),
  body("phone", "A valid phone is required").isMobilePhone(),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      // If errors while validating, return errors from form
      if (!errors.isEmpty()) {
        console.log(errors);
        const error = new Error(errors.array()[0].msg);
        error.status = 400;
        throw error;
      }

      // If existing user, return an error
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
      }

      // Encrypting password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateBirth: req.body.dateBirth,
        address: {
          street: req.body.street,
          town: req.body.town,
          zipCode: req.body.zipCode,
        },
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        isAdmin: false,
      });

      // If unique user, save in mongoDB
      await user.save((error) => {
        if (error) return next(error);
        const token = jwt.sign(
          { email: user.email, id: user._id, isAdmin: user.isAdmin },
          "test",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          ok: true,
          message: "User created successfully",
          user,
          token,
        });
      });
    } catch (error) {
      return next(error);
    }
  },
];
