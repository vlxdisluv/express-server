"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const LocalStrategy = passport_local_1.default.Strategy;
class User {
    constructor(users) {
        this.users = users;
    }
    findOne({ id, email, password }) {
        const foundUser = this.users.find(item => item.email === email);
        return Promise.resolve(foundUser);
    }
    findOneById(id) {
        const found = this.users.find(item => item.id === id);
        return Promise.resolve(found);
    }
}
const initUsers = [
    {
        id: "123456",
        email: "kosty-krasava@mail.ru",
        password: "123456"
    }
];
const UserModel = new User(initUsers);
passport_1.default.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, cb) => {
    // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return UserModel.findOne({ id: "1213", email, password })
        .then((user) => {
        if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
        }
        return cb(null, user, { message: "Logged In Successfully" });
    })
        .catch((err) => cb(err));
}));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret"
}, (jwtPayload, cb) => {
    // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.findOneById(jwtPayload.id)
        .then((user) => {
        return cb(null, user);
    })
        .catch((err) => {
        return cb(err);
    });
}));
//# sourceMappingURL=passport.js.map