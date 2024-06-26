const express = require("express");
const router = express.Router();

const {
  validateGetAddToCart,
  validateGetCartItems,
  validateRemoveFromCart,
} = require("../middlewares/validateMiddleware");
const { authenticateToken, refreshAccessToken } = require("../middlewares/authMiddleware");
const {
  addTocart,
  getCartItems,
  removeFromCart,
  changeQuantityCartItem,
} = require("../controllers/cartsController");

router.use(authenticateToken, refreshAccessToken);

router.post("/", validateGetAddToCart, addTocart);
router.get("/", validateGetCartItems, getCartItems);
router.delete("/:cartItemId", validateRemoveFromCart, removeFromCart);
router.put("/:cartItemId", validateRemoveFromCart, changeQuantityCartItem);

module.exports = router;
