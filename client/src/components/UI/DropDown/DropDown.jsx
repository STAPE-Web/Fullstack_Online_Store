import { useState } from 'react'

import styles from './DropDown.module.css'
import { ArrowDownIcon } from 'components/Icons/outline'

const DropDown = ({ text, type, data, value, changeEvent }) => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(null)

    const select = (item) => {
        setActive(item)
        changeEvent(item)
    }

    return (
        <div className={styles.DropDown}>
            <div
                className={type === 'outline' ? styles.Outline : styles.Solid}
                onClick={() => setOpen(!open)}
            >
                <p>{text}</p>
                <ArrowDownIcon className={open ? styles.iconOpen : styles.icon} />
            </div>

            {open && <div className={styles.List}>
                {data.map(item => (
                    <div
                        key={item.toString()}
                        className={value !== null && active === item ? styles.activeItem : styles.Item}
                        onClick={() => select(item)}
                    >{item}</div>
                ))}
            </div>}
        </div>
    )
}

export default DropDown