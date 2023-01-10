import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPage, selectUserData } from 'slices/globalSlices'

import styles from './Item.module.css'
import { CartIcon, MinusIcon, PlusIcon } from 'components/Icons/outline'
import Button from 'components/UI/Button/Button'

const Item = () => {
    const [item, setItem] = useState(null)
    const [imgGallery, setImgGallery] = useState(item?.gallery[0])
    const [amount, setAmount] = useState(1)

    const queryParams = new URLSearchParams(window.location.search).get("id")
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(selectUserData)

    useEffect(() => {
        if (queryParams === null) {
            navigation('/')
        }

        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/item/id?id=${queryParams}`).then(res => {
            if (res.data.data !== undefined) {
                setItem(res.data.data)
                setImgGallery(res.data.data.gallery[0])
            } else {
                navigation('/')
            }
        })

        dispatch(addPage('Item'))

        if (amount <= 0) {
            setAmount(1)
        }
    }, [navigation, queryParams, dispatch, amount])

    async function addItemToCart() {
        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/cart/create`, {
            itemName: item?.name,
            userId: userData?.id,
            itemId: queryParams,
            price: item?.price * amount,
            image: item?.image,
            imageParams: {
                width: item?.imageParams?.width,
                height: item?.imageParams?.height
            },
            amount: amount
        }).then(() => window.location.reload())
    }

    return (
        <div className={styles.Item}>
            <div className={styles.Main}>
                {item
                    ? <img src={imgGallery} className={styles.MainImage} alt="" />
                    : <div className={styles.MainImageNull}>
                        <div className={styles.Cover}></div>
                    </div>}

                <div className={styles.Info}>
                    <div className={styles.Top}>
                        <div className={styles.Title}>
                            <h1>{item?.name}</h1>
                        </div>

                        <div className={styles.Gallery}>
                            {item?.gallery?.map(i => (
                                <div key={i.toString()} onClick={() => setImgGallery(i)}>
                                    <img src={i} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.Bottom}>
                        <div className={styles.Specifications}>
                            <h2>Specifications</h2>

                            <ul>
                                <li><span>Sport Type:</span> {item?.sportType}</li>
                                <li><span>Weight:</span> {item?.weight}</li>
                                <li><span>Category:</span> {item?.category}</li>
                                <li><span>Release form:</span> {item?.releaseForm}</li>
                                <li><span>Brand:</span> {item?.brand}</li>
                                <li><span>Goals and objectives:</span> {item?.goalsAndObjectives}</li>
                                <li><span>Brand country:</span> {item?.brandCountry}</li>
                            </ul>
                        </div>

                        <div className={styles.ButtonAndPrice}>
                            <Button onClick={() => addItemToCart()}>
                                <CartIcon className={styles.icon} />
                                <p>In cart</p>
                            </Button>

                            <div className={styles.Counter}>
                                <div className={styles.amountButton} onClick={() => setAmount(amount - 1)}>
                                    <MinusIcon className={styles.icon} />
                                </div>

                                <div className={styles.amount}>
                                    {amount}
                                </div>

                                <div className={styles.amountButton} onClick={() => setAmount(amount + 1)}>
                                    <PlusIcon className={styles.icon} />
                                </div>
                            </div>

                            <h2><span>Price:</span> ${item?.price * amount}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.ExtendedInfo}>
                <div className={styles.Description}>
                    <h1>Description</h1>
                    <p>{item?.description}</p>
                </div>

                <div className={styles.Composition}>
                    <h1>Composition</h1>

                    <div className={styles.NutritionalValue}>
                        <h2>{item?.composition?.title}</h2>
                        <ul>
                            {item?.composition?.values?.map(value => (
                                <li key={value.toString()}>{value}</li>
                            ))}
                        </ul>

                        <p><span>Ingredients:</span> {item?.composition?.ingredients}</p>
                    </div>
                </div>

                <div className={styles.ModeOfApplication}>
                    <h1>Mode of application</h1>
                    <p>{item?.modeOfApplication}</p>
                </div>
            </div>
        </div>
    )
}

export default Item