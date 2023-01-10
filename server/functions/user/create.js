import { db } from '../../firebase.js'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import getUser from './getByEmail.js';

export default async function createUser(req, res) {
    await getUser(req?.body?.email, req?.body?.password).then(body => {
        if (body?.reg === true) {
            addDoc(collection(db, 'users'), {
                email: req.body?.email,
                password: req.body?.password,
                name: req.body?.name,
                surname: req.body?.surname,
                phoneNumber: req.body?.phoneNumber,
                address: req.body?.address,
                role: 'user',
                timestamp: serverTimestamp()
            }).then(() => {
                res.send({ message: 'User added', created: true })
            }).catch(err => console.log(err.message))
        } else {
            res.send({ message: 'This user already exists', created: false });
        }
    })
}