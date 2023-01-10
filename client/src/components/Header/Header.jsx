import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { selectAuth, selectPage, selectUserData } from "slices/globalSlices"

import styles from './Header.module.css'
import { CartIcon as CartIconOutline } from "components/Icons/outline"
import { CartIcon as CartIconSolid } from "components/Icons/solid"
import Avatar from "components/UI/Avatar/Avatar"
import Button from "components/UI/SmallButton/SmallButton"

const Header = () => {
    const [cartItems, setCartItems] = useState(null)

    const isAuth = useSelector(selectAuth)
    const user = useSelector(selectUserData)
    const page = useSelector(selectPage)

    const navigation = useNavigate();

    const getCartData = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/cart?id=${user?.id}`).then(res => setCartItems(res.data.length))
    }, [user])

    useEffect(() => {
        getCartData()
    }, [getCartData])

    return (
        <>
            {isAuth
                ? <header className={styles.Header}>
                    <Link to='/'>
                        <h1 className={styles.Logo}>Odama</h1>
                    </Link>

                    <div className={styles.Right}>
                        <div className={styles.Navigations}>
                            <Link to='/cart'>
                                <div className={styles.Cart}>
                                    {page === 'Cart'
                                        ? <CartIconSolid className={styles.Icon} />
                                        : <CartIconOutline className={styles.Icon} />
                                    }

                                    {cartItems > 0 && <div className={styles.Amount}>
                                        {cartItems}
                                    </div>}
                                </div>
                            </Link>
                        </div>

                        <Avatar name={user && user?.data?.name[0]} onClick={() => navigation('/profile')} />
                    </div>
                </header>
                : <header className={styles.Header}>
                    <Link to='/'>
                        <h1 className={styles.Logo}>Odama</h1>
                    </Link>

                    <Button onClick={() => navigation('/signin')}>SignIn</Button>
                </header>
            }
        </>
    )
}

export default Header