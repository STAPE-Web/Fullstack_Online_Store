import styles from './DangerButton.module.css'

const DangerButton = ({ children, onClick }) => {
    return (
        <button className={styles.Button} onClick={() => onClick()}>
            {children}
        </button>
    )
}

export default DangerButton