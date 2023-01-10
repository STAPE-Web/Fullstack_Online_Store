import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { authRouters, notAuthRouters } from "router"
import { addUser, selectAuth } from "slices/globalSlices"

import useAuth from "hooks/useAuth"
import useGetUserData from "hooks/useGetUserData"

const AppRouter = () => {
    const isAuth = useSelector(selectAuth)
    const userData = localStorage.getItem('userData')
    const dispatch = useDispatch()

    useAuth()
    useGetUserData()

    useEffect(() => {
        dispatch(addUser(JSON.parse(userData)))
    }, [dispatch, userData])

    return (
        <>
            {isAuth
                ? <Routes>
                    {authRouters.map(router => (
                        <Route path={router.path} element={<router.element />} key={router.id} />
                    ))}
                </Routes>
                : <Routes>
                    {notAuthRouters.map(router => (
                        <Route path={router.path} element={<router.element />} key={router.id} />
                    ))}
                </Routes>
            }
        </>
    )
}

export default AppRouter