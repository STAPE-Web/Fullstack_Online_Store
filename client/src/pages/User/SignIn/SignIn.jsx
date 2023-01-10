import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import styles from './SignIn.module.css'
import Illustration from 'assets/Illustration.svg'
import Button from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function sendData() {
        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/user/get/email`, {
            email: email,
            password: password
        }).then(res => {
            if (res.data.data) {
                localStorage.setItem('userData', JSON.stringify({ email: res.data.data.email, password: res.data.data.password }))
                localStorage.setItem('userSession', JSON.stringify(true))
                window.location.replace('/')
            } else {
                setError(res?.data?.message)
                setIsLoaded(false)
            }
        }).catch(err => error(err.code === "ERR_NETWORK" && 'Service is temporarily unavailable'))
    }

    function validation() {
        setIsLoaded(true)

        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (email.match(pattern)) {
            setError(null)
            sendData()
        } else {
            setError('Incorrect email')
            setIsLoaded(false)
        }
    }

    return (
        <div className={styles.SignIn}>
            <img src={Illustration} className={styles.Image} alt="" />

            <div className={styles.Form}>
                <h1>Sign In</h1>
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

                <Button
                    onClick={() => validation()}
                    disabled={email !== '' && password !== '' ? false : true}
                    isLoaded={isLoaded}
                >Sign In</Button>

                <p>You don't have an account yet?
                    <Link to='/signup'> Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn