import { Router } from "express";
import UserController from './Controllers/Users.js'
import ItemController from './Controllers/Items.js'
import CartController from './Controllers/Cart.js'
import OrderController from './Controllers/Order.js'

const router = new Router();

router.post('/user/create', UserController.create)
router.post('/user/delete', UserController.delete)
router.post('/user/get/email', UserController.get)
router.post('/user/update', UserController.update)

router.get('/item', ItemController.get)
router.get('/item/id', ItemController.getById)
router.post('/item/create', ItemController.create)

router.get('/cart', CartController.get)
router.post('/cart/create', CartController.create)
router.get('/cart/delete', CartController.delete)

router.post('/order/create', OrderController.create)

export default router