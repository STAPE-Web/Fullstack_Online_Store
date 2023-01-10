import createCart from "../functions/cart/create.js"
import getCart from "../functions/cart/get.js";
import deleteCart from "../functions/cart/delete.js";

class CartController {
    async create(req, res) {
        await createCart(req, res)
    }

    async delete(req, res) {
        await deleteCart(req, res)
    }

    async get(req, res) {
        res.send(await getCart(req.query.id));
    }
}

export default new CartController()