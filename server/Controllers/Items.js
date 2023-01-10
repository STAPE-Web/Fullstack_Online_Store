import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import createItem from "../functions/item/create.js";
import getItem from "../functions/item/get.js";

class ItemController {
    async create(req, res) {
        await createItem(req, res)
    }

    async get(req, res) {
        res.send(await getItem(req.query));
    }

    async getById(req, res) {
        res.send(await getDoc(doc(db, 'items', String(req.query.id)))
            .then(res => ({ id: res.id, data: res.data() }))
            .catch(err => console.log(err.message)))
    }
}

export default new ItemController()