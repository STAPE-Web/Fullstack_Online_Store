import Cart from 'pages/User/Cart/Cart'
import Home from 'pages/User/Home/Home'
import Item from 'pages/User/Item/Item'
import Order from 'pages/User/Order/Order'
import Profile from 'pages/User/Profile/Profile'
import SignIn from 'pages/User/SignIn/SignIn'
import SignUp from 'pages/User/SignUp/SignUp'

export const notAuthRouters = [
    { id: 1, path: '*', element: SignIn },
    { id: 2, path: '/', element: Home },
    { id: 3, path: '/signin', element: SignIn },
    { id: 4, path: '/signup', element: SignUp },
    { id: 5, path: '/item', element: Item },
]

export const authRouters = [
    { id: 1, path: '*', element: Home },
    { id: 2, path: '/', element: Home },
    { id: 3, path: '/cart', element: Cart },
    { id: 4, path: '/item', element: Item },
    { id: 5, path: '/profile', element: Profile },
    { id: 6, path: '/order', element: Order },
] 