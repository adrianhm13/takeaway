import User from "../models/user.js";
import { body, validationResult } from "express-validator";

export const userProfile = (req, res) => {
  res.send("User Profile");
};
export const getOrdersUser = (req, res) => {
  res.send("Get all orders from user");
};
export const getSpecificOrderUser = (req, res) => {
  res.send("Get Specific order from user");
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
    .withMessage("Write an email address")
    .normalizeEmail(),
  body("phone", "A valid phone is required").isMobilePhone(),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      // If errors, return validation errors from form
      if (!errors.isEmpty()) {
        return res.json({
          typeError: "validation",
          ok: false,
          errors: errors.array(),
        });
      }
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
      });

      // If existing user, return an error
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser)
        return res.json({
          typeError: "existingUser",
          ok: false,
          error: "User already exists",
        });

      // If unique user, save in mongoDB
      user.save((error) => {
        if (error) return next(error);
        res
          .status(200)
          .json({ ok: true, message: "User created successfully" });
      });
    } catch (error) {
      res.status(409).json({ message: "Not possible to sign up" });
    }
  },
];
