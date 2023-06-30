const express = require("express");
const router = express.Router();

const appController = require("../controllers/appController");
const {authenticateToken} = require("../middlewares/isAuth");


// ======================= Landing Page ======================= //
router.get("/", appController.landing_page);


// ======================= Login Page ======================= //
router.get("/login", appController.login_get);
router.post("/login", appController.login_post);


// ======================= Register Page ======================= //
router.get("/register", appController.register_get);
router.post("/register", appController.register_post);


// ======================= Dashboard Page ======================= //
router.get("/dashboard", authenticateToken, appController.dashboard_get);
router.post("/logout", appController.logout_post);


module.exports = router;