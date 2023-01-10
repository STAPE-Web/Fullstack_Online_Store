import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addPage, selectUserData } from "slices/globalSlices"

import styles from './Order.module.css'
import Button from "components/UI/Button/Button"
import CartItem from "components/UI/CartItem/CartItem"
import Input from "components/UI/Input/Input"
import Select from "components/UI/Select/Select"

const Order = () => {
    const [items, setItems] = useState([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [payment, setPayment] = useState('Cash')
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)
    const navigation = useNavigate()

    const getCartData = useCallback(async () => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/cart?id=${userData?.id}`)
            .then(res => res.data.map(({ data, id }) => setItems(prev => [...prev, { ...data, id }])))
    }, [userData])

    useEffect(() => {
        getCartData()

        dispatch(addPage('Order'))

        if (userData !== null) {
            setEmail(userData?.data?.email)
            setName(userData?.data?.name)
            setSurname(userData?.data?.surname)
            setPhoneNumber(userData?.data?.phoneNumber)
            setAddress(userData?.data?.address)
        }
    }, [dispatch, userData, getCartData])

    async function sendData() {
        setIsLoaded(true)

        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/order/create`, {
            email: email,
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            address: address,
            paymentMethod: payment,
            items: items,
            price: items?.reduce((acc, obj) => (acc + obj.price), 0),
        }).then(() => setIsLoaded(false)).then(() => navigation('/'))
    }


    return (
        <div className={styles.Order}>
            {items.length !== 0
                ? <>
                    <div className={styles.Items}>
                        {items.map((item, index) => (
                            <CartItem data={item} key={index} />
                        ))}
                    </div>

                    <div className={styles.Form}>
                        <h1>Make order</h1>
                        <Input
                            placeholder='Enter your email'
                            value={email}
                            readOnly={true}
                            type="email"
                        />
                        <Input
                            placeholder='Your name'
                            value={name}
                            readOnly={true}
                            type="text"
                        />
                        <Input
                            placeholder='Your surname'
                            value={surname}
                            readOnly={true}
                            type="text"
                        />
                        <Input
                            placeholder='Phone Number'
                            value={phoneNumber}
                            readOnly={true}
                            type="text"
                        />
                        <Input
                            placeholder='Your address'
                            value={address}
                            readOnly={true}
                            type="text"
                        />

                        <Select
                            text='Payment method'
                            data={['Cash', 'Card']}
                            value={payment}
                            changeEvent={setPayment}
                        />

                        <Button
                            onClick={() => sendData()}
                            isLoaded={isLoaded}
                        >Order</Button>

                        <h1>Total price: <span>${items?.reduce((acc, obj) => (acc + obj.price), 0)}</span></h1>
                    </div>
                </>
                : <h1 className={styles.Empty}>Please wait, items are loading</h1>
            }
        </div>
    )
}

export default Order