const { addNewAddress } = require("../controllers/addressController");
const { getAllAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/addNewAddress").post(protect, addNewAddress);
router.route("/getAllAddress").get(protect, getAllAddress);

module.exports = router;