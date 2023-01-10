import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addPage } from 'slices/globalSlices'

import useFilter from 'hooks/useFilter'

import styles from './Home.module.css'
import Banner from 'assets/Banner.png'
import Button from 'components/UI/Button/Button'
import Filter from 'components/UI/Filter/Filter'
import Search from 'components/UI/Search/Search'
import Item from 'components/UI/Item/Item'

const Home = () => {
    const [search, setSearch] = useState('')

    const items = useFilter()
    const dispatch = useDispatch()
    const navigaton = useNavigate()

    useEffect(() => {
        dispatch(addPage('Home'))
    }, [dispatch])

    return (
        <div className={styles.Home}>
            <div className={styles.Conatiner}>
                <img src={Banner} className={styles.Banner} alt="" />
                <div className={styles.Box}>
                    <h1>Get fit with cool <br /> sports nutrition</h1>
                    <p>Try the new sports nutrition collection</p>
                    <Button onClick={() => navigaton(`/item?id=UelO3xfR3IIMg58tMEeG`)}>Get a slim figure</Button>
                </div>
            </div>

            <div className={styles.FilterSearchBox}>
                <Filter />
                <Search value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className={styles.Catalog}>
                {items.length === 0
                    ? <h1 className={styles.Empty}>Please wait, items are loading</h1>
                    : <>
                        {items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                            <Item data={item} key={index} />
                        ))}
                    </>
                }
            </div>
        </div>
    )
}

export default Home