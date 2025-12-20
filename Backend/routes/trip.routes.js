const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");
const tripController = require("../controllers/trip.controller");

router.post("/", tripController.handleTripStatus);
router.get("/:userId", tripController.getTrips);
router.get("/transport/:token", tripController.getTripsByTransportId);

module.exports = router;
