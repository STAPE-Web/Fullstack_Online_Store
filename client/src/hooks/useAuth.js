export default function useAuth() {
    const session = JSON.parse(localStorage.getItem('userSession'))
    const data = JSON.parse(localStorage.getItem('userData'))

    if (data === null && session !== false) {
        window.location.replace('/signin')
        localStorage.setItem('userSession', JSON.stringify(false))
    }
}