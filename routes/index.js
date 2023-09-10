var express = require('express');
var router = express.Router();

const authRouter = require("./auth")
const userRouter = require("./users")
const balanceRouter = require("./balance")

/* GET home page. */
router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/balance", balanceRouter)

module.exports = router;
