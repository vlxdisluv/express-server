import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import { getRepository } from "typeorm";
import { User } from "./entity/User.entity";

const LocalStrategy = passportLocal.Strategy;

interface UserInterface {
  // id: string;
  email: string;
  password: string;
}

// class User {
//   private users: UserInterface[];

//   constructor(users: UserInterface[]) {
//     this.users = users;
//   }

//   findOne({ id, email, password }: UserInterface) {
//     const foundUser = this.users.find(item => item.email === email);
//     return Promise.resolve(foundUser);
//   }

//   findOneById(id: any) {
//     const found = this.users.find(item => item.id === id);
//     return Promise.resolve(found);
//   }
// }

// const initUsers = [
//   {
//     id: "123456",
//     email: "kosty-krasava@mail.ru",
//     password: "123456"
//   }
// ];

// const UserModel = new User(initUsers);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, cb) => {
      // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      const userRepository = getRepository(User);

      return userRepository
        .findOne({ where: { email, password } })
        .then(({ id, email, password }) => {
          if (!email || !password) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(
            null,
            { id, email, password },
            { message: "Logged In Successfully" }
          );
        })
        .catch((err: any) => cb(err));
    }
  )
);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    (jwtPayload, cb) => {
      // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      const userRepository = getRepository(User);
      return userRepository
        .findOne({ id: jwtPayload.id })
        .then((user: any) => {
          return cb(null, user);
        })
        .catch((err: any) => {
          return cb(err);
        });
    }
  )
);
