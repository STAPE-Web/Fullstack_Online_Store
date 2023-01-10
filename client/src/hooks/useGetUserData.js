import axios from "axios"
import { useDispatch } from "react-redux";
import { addUserData } from "slices/globalSlices";

export default async function useGetUserData() {
    const storageData = JSON.parse(localStorage.getItem('userData'))
    const dispatch = useDispatch()

    storageData !== null && await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/user/get/email`, {
        email: storageData?.email,
        password: storageData?.password
    }).then(res => {
        if (res.data.auth === false) {
            localStorage.removeItem('userData')
            localStorage.removeItem('userSession')
        } else {
            dispatch(addUserData(res.data))
        }
    })
}