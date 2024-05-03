import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/user";
const JWT_SECRET = "loki";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOfKey: JWT_SECRET,
};

passport.use(
  new Strategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export default passport;
