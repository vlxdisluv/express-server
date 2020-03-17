"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
Promise.resolve().then(() => __importStar(require("./passport")));
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;
const app = express_1.default();
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// define a route handler for the default home page
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", auth_1.default);
app.use("/user", passport_1.default.authenticate("jwt", { session: false }), user_1.default);
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map