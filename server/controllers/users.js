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
  body("name", "First name required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters minimum")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ok: false, errors: errors.errors });
      } else {
        const user = new User({
          firstName: req.body.name,
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // dateBirth: req.body.dateBirth,
          // address: {
          //   street: req.body.address.street,
          //   town: req.body.address.town,
          //   zipCode: req.body.address.zipCode,
          // },
          // email: req.body.email,
          // phone: req.body.phone,
        });

        user.save((error) => {
          if (error) return next(error);
        });
      }
    } catch (error) {
      res.status(409).json({ message: "Not possible to sign up" });
    }
  },
];
