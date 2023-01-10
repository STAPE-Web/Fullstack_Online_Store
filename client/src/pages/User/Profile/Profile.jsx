import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addPage, selectUserData } from "slices/globalSlices"

import styles from './Profile.module.css'
import Illustration from 'assets/Illustration.svg'
import Input from "components/UI/Input/Input"
import Button from "components/UI/Button/Button"
import { LogoutIcon } from "components/Icons/outline"
import DangerButton from "components/UI/DangerButton/DangerButton"

const Profile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)

    useEffect(() => {
        if (userData !== null) {
            setEmail(userData?.data?.email)
            setPassword(userData?.data?.password)
            setName(userData?.data?.name)
            setSurname(userData?.data?.surname)
            setPhoneNumber(userData?.data?.phoneNumber)
            setAddress(userData?.data?.address)
        }

        if (success !== null) {
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        }

        dispatch(addPage('Profile'))
    }, [userData, success, dispatch])

    async function sendData() {
        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/user/update`, {
            id: userData?.id,
            email: email,
            password: password,
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            address: address
        }).then(res => {
            if (res.data.updated) {
                setIsLoaded(false)
                setSuccess(res.data.message)
                window.location.reload()
            }
        })
    }


    function validation() {
        setIsLoaded(true)

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;

        function createError(text) {
            setError(text)
            setIsLoaded(false)

            setTimeout(() => {
                setError(null)
            }, 5000)
        }

        if (!email.match(emailPattern)) {
            createError('Incorrect email')
        } else if (password.length < 8) {
            createError('Password from 8 characters')
        } else if (!phoneNumber.match(phoneNumberPattern)) {
            createError('Incorrect phone number')
        } else if (error == null) {
            setError(null)
            userData !== null && sendData()
        }
    }

    function deleteAccount() {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/user/delete`, {
            id: userData?.id
        }).then(() => {
            localStorage.setItem('userSession', JSON.stringify(false))
            localStorage.removeItem('userData')
            window.location.replace('/signin')
        })
    }

    function Logout() {
        localStorage.setItem('userSession', JSON.stringify(false))
        localStorage.removeItem('userData')
        window.location.replace('/signin')
    }

    return (
        <div className={styles.Profile}>
            <img src={Illustration} className={styles.Image} alt="" />

            <div className={styles.Form}>
                <div className={styles.Top}>
                    <h1>Profile of {userData?.data?.name}</h1>

                    <div className={styles.Logout} onClick={() => Logout()}>
                        <LogoutIcon className={styles.icon} />
                    </div>
                </div>
                {error && <p className={styles.Error}>{error}</p>}
                {success && <p className={styles.Success}>{success}</p>}

                <Input
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                />
                <Input
                    placeholder='Enter your password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <Input
                    placeholder='Your name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
                <Input
                    placeholder='Your surname'
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    type="text"
                />
                <Input
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    type="text"
                />
                <Input
                    placeholder='Your address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    type="text"
                />

                <Button
                    onClick={() => validation()}
                    isLoaded={isLoaded}
                >Update</Button>
                <DangerButton
                    onClick={() => deleteAccount()}
                    isLoaded={isLoaded}
                >Delete account</DangerButton>
            </div>
        </div>
    )
}

export default Profile