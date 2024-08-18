import axios from "axios"

export function LogoutPage(){
        const res = axios.post(`https://nicochat-api..com/api/logout`, {})
    return (
        <h1>Logout</h1>
    )
}
