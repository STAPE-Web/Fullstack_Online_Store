import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';

export default async function getUser(email, password) {
    let user = null
    const q = query(collection(db, "users"), where("email", "==", email))

    const querySnapshot = await getDocs(q).catch((err) => console.log(err));
    querySnapshot.forEach((doc) => {
        user = {
            id: doc.id,
            data: doc.data()
        }
    })

    if (user === null) {
        return { message: 'Invalid email', auth: false, reg: true }
    }

    if (user?.data?.password === password) {
        return user
    } else {
        return { message: 'Wrong password', auth: false, reg: false }
    }
}