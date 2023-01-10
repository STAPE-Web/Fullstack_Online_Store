import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import styles from './SignUp.module.css'
import Illustration from 'assets/Illustration.svg'
import Button from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function sendData() {
        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/user/create`, {
            email: email,
            password: password,
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            address: address,
        }).then(res => {
            if (res.data.created === true) {
                localStorage.setItem('userSession', res.data.created)
                localStorage.setItem('userData', JSON.stringify({ email: email, password: password }))
                window.location.replace('/')
            } else {
                setError(res.data.message)
                setIsLoaded(false)
            }
        }).catch(err => setError(err.code === "ERR_NETWORK" && 'Service is temporarily unavailable'))
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
        } else if (password !== confirmPassword) {
            createError("Passwords don't match")
        } else if (password.length < 8) {
            createError("Password from 8 characters")
        } else if (!phoneNumber.match(phoneNumberPattern)) {
            createError("Incorrect phone number")
        } else if (error == null) {
            setError(null)
            sendData()
        }
    }

    return (
        <div className={styles.SignUp}>
            <img src={Illustration} className={styles.Image} alt="" />

            <div className={styles.Form}>
                <h1>Sign Up</h1>
                {error && <p className={styles.Error}>{error}</p>}

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
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
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
                    disabled={email !== '' &&
                        password !== '' &&
                        confirmPassword !== '' &&
                        name !== '' &&
                        surname !== '' &&
                        phoneNumber !== '' &&
                        address !== '' ? false : true}
                    isLoaded={isLoaded}
                >Sign Up</Button>

                <p>Do you already have an account?
                    <Link to='/signin'> Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp