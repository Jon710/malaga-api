import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { User } from "../entities/user.entity";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(opts, ({ id, role }, done) => {
    try {
      const user: Partial<User> = { id, role };
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
