"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/* GET users listing. */
router.get("/", (req, res, next) => {
    res.send("respond with a resource");
});
/* GET user profile. */
router.get("/profile", (req, res, next) => {
    res.send(req.user);
});
exports.default = router;
// module.exports = router;
//# sourceMappingURL=user.js.map