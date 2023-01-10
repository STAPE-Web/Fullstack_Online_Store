import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function deleteUser(id) {
    await deleteDoc(doc(db, 'users', id))
        .then(res => console.log(res))
        .catch(err => console.log(err))

    return { message: 'User deleted', deleted: true }
}