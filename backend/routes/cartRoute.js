const { createCartSession, clearCart } = require("../controllers/cartController");
const { addProduct } = require("../controllers/cartController");
const { getProducts } = require("../controllers/cartController");

const { protect } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/createSession").post( createCartSession);
router.route("/addProductToCart").post(addProduct);
router.route("/getProductsFromCart").get(getProducts);
router.route("/clearCart").post(clearCart);

module.exports = router;