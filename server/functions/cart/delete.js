import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function deleteCart(req, res) {
    await deleteDoc(doc(db, 'cart', req.query.id)).then(() => {
        res.send({
            message: 'Cart item was deleted',
            deleted: true
        })
    })
}