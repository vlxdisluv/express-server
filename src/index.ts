import dotenv from "dotenv";
import express from "express";
import path from "path";
import passport from "passport";
import auth from "./routes/auth";
import user from "./routes/user";
import("./passport");

dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;
const app = express();

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// define a route handler for the default home page
app.use(express.json());
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

export default app;
