import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function getCart(id) {
    const data = []
    const q = query(collection(db, 'cart'), where("userId", "==", id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => data.push({
        id: doc.id,
        data: doc.data()
    }))

    return data
}