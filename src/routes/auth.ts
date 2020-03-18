import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
// import { User } from "../entity/User";

interface UserDto {
  email: string;
  password: string;
}

const router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user
      });
    }
    req.login(user, { session: false }, error => {
      if (error) {
        res.send(error);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res);
});

router.post("/register", async (req: { body: UserDto }, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        error: "Missing required email and password fields",
        status: 404,
        validationErrors: {
          email: "Email or password is invalid",
          password: "Email or password is invalid"
        }
      });
      throw new Error("404");
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      res.status(409).json({
        error: "User with this email already exist",
        status: 409,
        validationErrors: {
          email: "Email already exist"
        }
      });
      throw new Error("409");
    }

    const createdUser = userRepository.save({ email, password });
    res.json({ email, password });
  } catch (error) {
    next(error);
  }
});
export default router;
