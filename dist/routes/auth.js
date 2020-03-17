"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", { session: false }, (err, user, info) => {
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
            const token = jsonwebtoken_1.default.sign(user, "your_jwt_secret");
            return res.json({ user, token });
        });
    })(req, res);
});
exports.default = router;
//# sourceMappingURL=auth.js.map