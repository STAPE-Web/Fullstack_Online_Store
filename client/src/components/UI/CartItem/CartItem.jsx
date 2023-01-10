import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from './CartItem.module.css';
import { DeleteIcon } from "components/Icons/outline";

const CartItem = ({ data }) => {
    const navigation = useNavigate()

    async function deleteCartItem(e) {
        e.stopPropagation()

        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/cart/delete?id=${data.id}`).then(res => window.location.reload())
    }

    return (
        <div className={styles.Item} onClick={() => navigation(`/item?id=${data.itemId}`)}>
            <div className={styles.Image}>
                <img
                    src={data.image}
                    style={{
                        width: data.imageParams.width,
                        height: data.imageParams.height,
                    }}
                    alt=""
                />

                <div className={styles.Data}>
                    x{data.amount}
                </div>

                <div className={styles.Remove} onClick={e => deleteCartItem(e)}>
                    <DeleteIcon className={styles.icon} />
                </div>
            </div>

            <div className={styles.Info}>
                <h2>{data.itemName}</h2>
                <p>${data.price}</p>
            </div>
        </div>
    )
}

export default CartItem