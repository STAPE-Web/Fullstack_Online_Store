import { db } from '../../firebase.js'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default async function createItem(req, res) {
    addDoc(collection(db, 'items'), {
        name: req.body?.name,
        gallery: req.body?.gallery,
        image: req.body?.image,
        imageParams: req.body?.imageParams,
        sportType: req.body?.sportType,
        weight: req.body?.weight,
        category: req.body?.category,
        releaseForm: req.body?.releaseForm,
        brand: req.body?.brand,
        brandCountry: req.body?.brandCountry,
        goalsAndObjectives: req.body?.goalsAndObjectives,
        price: req.body?.price,
        description: req.body?.description,
        composition: req.body?.composition,
        modeOfApplication: req.body?.modeOfApplication,
        timestamp: serverTimestamp()
    }).then(() => {
        res.send({ message: 'Item cteare', created: true })
    }).catch(err => console.log(err.message))
}