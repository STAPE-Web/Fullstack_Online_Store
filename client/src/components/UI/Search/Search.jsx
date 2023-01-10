import styles from './Search.module.css'
import { SearchIcon } from 'components/Icons/outline'

const Search = ({ value, onChange }) => {
    return (
        <div className={styles.Search}>
            <SearchIcon className={styles.icon} />
            <input
                value={value}
                onChange={onChange}
                placeholder='Search'
                type="text"
            />
        </div>
    )
}

export default Search