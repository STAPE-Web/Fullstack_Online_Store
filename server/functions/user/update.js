import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function updateUser(req, res) {
    await updateDoc(doc(db, 'users', req.body?.id), {
        email: req.body?.email,
        password: req.body?.password,
        name: req.body?.name,
        surname: req.body?.surname,
        phoneNumber: req.body?.phoneNumber,
        address: req.body?.address,
        role: 'user'
    }).then(() => {
        res.send({ message: 'The user has been updated', updated: true });
    }).catch(err => console.log(err))
} 