const express = require('express');
const cartController = require('../Controllers/cart');

const router = express.Router();

router.post('/cart/add-product',cartController.postProduct);
router.get('/cart/get-products',cartController.getProduct);
router.post('/cart/delete-product/:productid',cartController.postDeleteProducts)

module.exports=router;