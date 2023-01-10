import createOrder from "../functions/order/create.js"

class OrderController {
    async create(req, res) {
        await createOrder(req, res)
    }
}

export default new OrderController()