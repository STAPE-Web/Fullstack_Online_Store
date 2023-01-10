import styles from './SmallButton.module.css'

const Button = ({ onClick, children }) => {
    return (
        <button className={styles.Button} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button