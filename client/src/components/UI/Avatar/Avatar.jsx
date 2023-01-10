import styles from './Avatar.module.css'

const Avatar = ({ name, onClick }) => {
    return (
        <div className={styles.Avatar} onClick={onClick}>
            {name
                ? <h2>{name}</h2>
                : <div className={styles.Cover}></div>
            }
        </div>
    )
}

export default Avatar