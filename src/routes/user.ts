import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";

const router = Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* GET user profile. */
router.get("/profile", (req, res, next) => {
  res.send(req.user);
});

router.get("/profile", (req, res, next) => {
  res.send(req.user);
});

router.get("/users", async (req, res, next) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  // tslint:disable-next-line:no-console
  console.log('users', users);
  res.json(users);
});

export default router;

// module.exports = router;
