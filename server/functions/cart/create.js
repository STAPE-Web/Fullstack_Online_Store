import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function createCart(req, res) {
    await addDoc(collection(db, 'cart'), {
        itemName: req.body.itemName,
        userId: req.body.userId,
        itemId: req.body.itemId,
        price: req.body.price,
        image: req.body.image,
        amount: req.body.amount,
        imageParams: req.body.imageParams,
        timestamp: serverTimestamp()
    }).then(() => {
        res.send({ message: 'Item added to cart', created: true })
    }).catch(err => console.log(err))
}