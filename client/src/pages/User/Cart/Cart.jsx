import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPage, selectUserData } from 'slices/globalSlices'

import styles from './Cart.module.css'
import SmallButton from 'components/UI/SmallButton/SmallButton'
import CartItem from 'components/UI/CartItem/CartItem'
import Search from 'components/UI/Search/Search'

const Cart = () => {
    const [search, setSearch] = useState('')
    const [items, setItems] = useState([])
    const [emptyMessage, setEmptyMessage] = useState('Please wait, items are loading')

    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()
    const navigation = useNavigate()

    const getCartData = useCallback(async () => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/cart?id=${userData?.id}`)
            .then(res => res.data.map(({ data, id }) => setItems(prev => [...prev, { ...data, id }])))
    }, [userData])

    useEffect(() => {
        getCartData()

        dispatch(addPage('Cart'))

        setTimeout(() => {
            setEmptyMessage('You have no items in your shopping cart')
        }, 5000)
    }, [dispatch, getCartData])


    return (
        <div className={styles.Cart}>
            {items.length === 0
                ? <h1 className={styles.Empty}>{emptyMessage}</h1>
                : <>
                    <div className={styles.Top}>
                        <Search value={search} onChange={e => setSearch(e.target.value)} />

                        <div className={styles.CheckOut}>
                            <h2><span>Total:</span> ${items?.reduce((acc, obj) => (acc + obj.price), 0)}</h2>

                            <div onClick={() => navigation('/order')}>
                                <SmallButton>Checkout</SmallButton>
                            </div>
                        </div>
                    </div>

                    <div className={styles.Catalog}>
                        {items.filter(item => item.itemName.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                            <CartItem data={item} key={index} />
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default Cart