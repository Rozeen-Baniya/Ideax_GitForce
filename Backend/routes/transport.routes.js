const router = require("express").Router();
const transportController = require("../controllers/transport.controller");

// Register a new transport
router.post("/register", transportController.registerTransport);
router.post("/login", transportController.loginTransport);
router.post("/verify", transportController.verifyDriverLogin);

module.exports = router;
