import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editFilter } from 'slices/globalSlices'

import styles from './Filter.module.css'
import { ResetIcon } from 'components/Icons/outline'
import DropDown from '../DropDown/DropDown'

const Filter = () => {
    const [category, setCategory] = useState(null)
    const [brandCountry, setBrandCountry] = useState(null)
    const [sort, setSort] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(editFilter({
            category: category,
            brandCountry: brandCountry,
            sort: sort,
        }))
    }, [category, brandCountry, sort, dispatch])

    const items = [
        {
            id: 1,
            text: 'Category',
            type: 'solid',
            value: category,
            changeEvent: setCategory,
            data: ['Amino acids', 'Protein bars', 'Vitamins', 'Gainers', 'Energy drinks', 'Protein', 'Creatine']
        },
        {
            id: 2,
            text: 'Brand Country',
            type: 'solid',
            value: brandCountry,
            changeEvent: setBrandCountry,
            data: ['Russia', 'USA', 'Sweden', 'France', 'Germany', 'Great Britain']
        },
        {
            id: 3,
            text: 'Sort by',
            type: 'outline',
            value: sort,
            changeEvent: setSort,
            data: ['Price']
        },
    ]

    return (
        <div className={styles.Filter}>
            {items.map(item => (
                <DropDown
                    key={item.id}
                    text={item.text}
                    type={item.type}
                    data={item.data}
                    value={item.value}
                    changeEvent={item.changeEvent}
                />
            ))}
            <div className={styles.Reset} onClick={() => {
                setCategory(null)
                setBrandCountry(null)
                setSort(null)
            }}>
                <ResetIcon className={styles.icon} />
            </div>
        </div>
    )
}

export default Filter