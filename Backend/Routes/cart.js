const express = require('express');
const cartController = require('../Controllers/cart');

const router = express.Router();

router.post('/cart/add-product',cartController.postProduct);
router.get('/cart/get-products',cartController.getProduct);
router.get('/cart/get-productsforOrder',cartController.getAllOrders);
router.post('/cart/postOrder',cartController.postOrder);
router.post('/cart/delete-product/:productid',cartController.postDeleteProduct);

module.exports=router;