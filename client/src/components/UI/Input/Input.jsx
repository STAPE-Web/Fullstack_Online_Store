import styles from './Input.module.css'

const Input = ({ placeholder, value, onChange, type, readOnly }) => {
    return (
        <input
            className={styles.Input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            readOnly={readOnly}
        />
    )
}

export default Input