const express = require('express');
const { addItemToCart } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common_middleware');
const router = express.Router();


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;