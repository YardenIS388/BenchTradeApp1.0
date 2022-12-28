const { Router } = require("express");
const authRouter = new Router();
const { authController } = require("./../controllers/auth.controller");

authRouter.post("/login", authController.login);

module.exports = { authRouter };
