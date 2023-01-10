import styles from './Item.module.css';
import { Link } from "react-router-dom";

const Item = ({ data }) => {
    return (
        <Link to={`/item?id=${data.id}`}>
            <div className={styles.Item}>
                <div className={styles.Image}>
                    <img
                        src={data.image}
                        style={{
                            width: data.imageParams.width,
                            height: data.imageParams.height,
                        }}
                        alt=""
                    />
                </div>

                <div className={styles.Info}>
                    <h2>{data.name}</h2>
                    <p>${data.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Item