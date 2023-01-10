import { db } from '../../firebase.js'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default async function createItem(req, res) {
    addDoc(collection(db, 'orders'), {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        items: req.body.items,
        price: req.body.price,
        timestamp: serverTimestamp()
    }).then(() => {
        res.send({ message: 'Item cteare', created: true })
    }).catch(err => console.log(err.message))
}