const { createOrder } = require("../controllers/orderController");

const { protect } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/createOrder").post(protect, createOrder);

module.exports = router;