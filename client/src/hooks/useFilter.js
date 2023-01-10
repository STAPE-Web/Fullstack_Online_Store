import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectFilter } from "slices/globalSlices"

export default function useFilter() {
    const [items, setItems] = useState([])
    const { category, brandCountry, sort } = useSelector(selectFilter)

    function getItem(url) {
        setItems([])
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER + url}`)
            .then(res => res.data.map(({ data, id }) => setItems(prev => [...prev, { ...data, id }])))
    }

    useEffect(() => {
        getItem(`/item?category=${category}&brandCountry=${brandCountry}&sort=${sort}`)
    }, [category, brandCountry, sort])

    return items
}
