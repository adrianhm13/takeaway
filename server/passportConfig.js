import bcrypt from "bcryptjs";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import User from "./models/user.js";

const passportFn = new LocalStrategy((username, password, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    });
  });
});

export default passportFn;
