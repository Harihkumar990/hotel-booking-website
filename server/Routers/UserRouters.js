const express = require("express");
const validatiomiddleware = require("../middlewares/validator-middleware");
const validation = require("../Validator/error-validator");
const UserControllers = require("../controllers/UserrouterController");

const verifyjsonwebtoken = require("../middlewares/authorization-middleware");

const UserRouter = express.Router();


UserRouter.route("/").get(UserControllers.response);

UserRouter.route("/Signup").post(validatiomiddleware(validation.validation_signup),UserControllers.SignupControl);

UserRouter.route("/Login").post(validatiomiddleware(validation.validation_login),UserControllers.LoginUser);

UserRouter.route("/User").get(verifyjsonwebtoken,UserControllers.User);

module.exports = UserRouter;
