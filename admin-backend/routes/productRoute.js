const { addProduct } = require("../controllers/productsController");
const {  } = require("../controllers/productsController");
const { protect } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/addProduct").post(protect, addProduct);


module.exports = router;