import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.js";

export default async function getItem(params) {
    let data = []
    const category = params.category === 'null' ? JSON.parse(params.category) : params.category
    const brandCountry = params.brandCountry === 'null' ? JSON.parse(params.brandCountry) : params.brandCountry
    const sort = params.sort === 'null' ? JSON.parse(params.sort) : params.sort

    async function filterItems(queryItem) {
        data = []
        let itemData = []
        const querySnapshot = await getDocs(queryItem);

        querySnapshot.forEach(doc => (itemData.push({
            id: doc.id,
            data: doc.data()
        })));

        return itemData;
    }

    if (category === null && brandCountry === null) {
        data = filterItems(collection(db, 'items'))
    } if (category !== null) {
        data = filterItems(query(collection(db, 'items'), where("category", "==", params.category)))
    } if (brandCountry !== null) {
        data = filterItems(query(collection(db, 'items'), where("brandCountry", "==", params.brandCountry)))
    } if (category !== null && brandCountry !== null) {
        data = filterItems(query(collection(db, 'items'), where("category", "==", params.category), where("brandCountry", "==", params.brandCountry)))
    }

    if (sort !== null) {
        data.then(res => res.sort(function (a, b) {
            if (a.data.price > b.data.price) return 1
            if (a.data.price < b.data.price) return -1
            return 0
        }))
    }

    return data
}