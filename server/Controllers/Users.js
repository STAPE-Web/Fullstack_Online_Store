import createUser from "../functions/user/create.js";
import deleteUser from "../functions/user/delete.js";
import getUser from "../functions/user/getByEmail.js";
import updateUser from "../functions/user/update.js";

class UserController {
    async create(req, res) {
        await createUser(req, res)
    }

    async delete(req, res) {
        res.send(await deleteUser(req.body.id))
    }

    async update(req, res) {
        await updateUser(req, res)
    }

    async get(req, res) {
        res.send(await getUser(req.body?.email, req.body?.password));
    }
}

export default new UserController()