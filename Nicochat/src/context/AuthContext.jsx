import { createContext, useContext, useEffect, useState } from "react";
import { ChangePasswordRequest, logInRequest, logoutRequest, registerRequest, verifyToken } from "../api/auth";

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth musth be used within an AuthProvider")
    }
    return context;
}
export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true);


    const register = async (user) => {
        try {
            const file = user.file;
            delete user.file;
            const res = await registerRequest(user);
               if (file) {
                const ws = new WebSocket('ws://nicochat-api.onrender.com');
                ws.onopen = () => {
                    ws.send(JSON.stringify({
                        profilePicture: { id: res.data.id, file }
                    }))

                }
            } 
            setUser(res.data);
            setIsAuth(true);
        } catch (err) {
            //console.log(err);
            setError(err.response.data);
        }
    }
    const login = async (user) => {
        try {
            const res = await logInRequest(user);
            setUser(res.data);
            setIsAuth(true)
        } catch (error) {
            console.log(error)
            setError(error.response.data)
        }
    }
    const changePassword = async (change) => {
        console.log(change)
        try {
            const res = await ChangePasswordRequest(change);
            return { res: res.data[0], status: res.status }

        } catch (err) {
            return { res: err.response.data[0], status: err.response.status }
        }
    }
    const logout = async (user) => {
        const res = await logoutRequest(user);
        console.log(res)
        setUser(null);
        setIsAuth(false);
        location.reload()
    }
    useEffect(() => {
        async function confirm() {
            let token = document.cookie;
            if (!token.includes('token')) {
                setIsAuth(false)
                setLoading(false)
                return setUser(null)
            }

            if (token.includes('token')) {
                try {
                    const res = await verifyToken(token.replace('token=', ''))
                    if (!res.data) {
                        setIsAuth(false)
                        setLoading(false);
                        console.log(isAuth, user)
                        return;

                    }

                    setUser(res.data)
                    setIsAuth(true)
                    setLoading(false)
                } catch (err) {
                    setIsAuth(false)
                    setUser(null)
                    console.log(err)
                    setLoading(false)
                }
            }
        }
        confirm()
    }, [])
    return (
        <AuthContext.Provider value={{
            register,
            changePassword,
            user,
            isAuth,
            login,
            logout,
            error,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}