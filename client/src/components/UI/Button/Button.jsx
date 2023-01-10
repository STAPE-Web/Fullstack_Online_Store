import styles from './Button.module.css'
import Loader from 'components/UI/Loader/Loader'

const Button = ({ children, onClick, disabled, isLoaded }) => {
    return (
        <button className={isLoaded ? styles.ButtonLoaded : styles.Button}
            onClick={() => onClick()}
            disabled={disabled}
        >
            {isLoaded ? <Loader /> : children}
        </button>
    )
}

export default Button