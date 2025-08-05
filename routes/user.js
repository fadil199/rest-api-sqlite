const router = require("express").Router()
const control = require("../cotrollers")
const midle = require("../middleware/auth");
const validate = require("../middleware/validate");
const roles = require("../utils/roles");

router.post("/register", validate.validateRegister(), control.user.register);
router.post("/login",validate.validateLogin(), control.user.login);
router.get("/me", midle(roles.user), control.user.me);

module.exports = router;