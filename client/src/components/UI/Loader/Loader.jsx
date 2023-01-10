import styles from './Loader.module.css'

const Loader = ({ width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "31"}
            height={height || "31"}
            fill="none"
            viewBox="0 0 31 31"
            className={styles.Loader}
        >
            <path
                stroke="#fff"
                strokeWidth="3"
                d="M29 15c0 7.732-6.044 14-13.5 14S2 22.732 2 15M15 2c7.732 0 14 5.82 14 13"
            ></path>
            <path
                stroke="#fff"
                strokeOpacity="0.3"
                strokeWidth="3"
                d="M2 15C2 7.82 7.82 2 15 2"
            ></path>
        </svg>
    )
}

export default Loader