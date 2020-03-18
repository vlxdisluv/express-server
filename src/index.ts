import express from "express";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import auth from "./routes/auth";
import user from "./routes/user";
import { createConnection } from "typeorm";
import { User } from "./entity/User.entity";
import("./passport");
import bodyParser from "body-parser";

dotenv.config();
// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);
  // tslint:disable-next-line:no-console
  // console.log("userRepository", userRepository);
  // port is now available to the Node.js runtime
  // as if it were an environment variable
  const port = process.env.SERVER_PORT;
  const app = express();

  // Configure Express to use EJS
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  // app.use(bodyParser.json({ type: "application/*+json" }));
  // app.use(
  //   bodyParser.urlencoded({
  //     extended: true
  //   })
  // );
  app.use(express.json());

  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/auth", auth);
  app.use("/user", passport.authenticate("jwt", { session: false }), user);

  // start the express server
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });
});
