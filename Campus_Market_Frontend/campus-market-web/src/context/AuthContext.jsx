import {createContext, useContext, useEffect, useState} from "react";
import {authApi} from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setLoading(false);
            return;
        }

        authApi.getMe()
            .then(res => {
                const user = res.user ?? res;
                setCurrentUser(user);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setCurrentUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.login(data);
            const token = res.token;
            const user = res.user ?? res;

            localStorage.setItem("token", token);
            setCurrentUser(user);
            return user;
        } catch(err) {
            setError(err.message || "Login failed!");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.register(data);

            const token = res.token;
            const user = res.user ?? res;

            if(token) localStorage.setItem("token", token);
            setCurrentUser(user);
            return user;
        } catch (err) {
            setError(err.message || "Register failed");
            throw err;
        } finally {
            setLoading(false)
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    if (loading){
        return <div className="flex items-center justify-center h-screen">
            Loading...
        </div>
    }
    return (
        <AuthContext.Provider value={{
            currentUser,
            loading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    return useContext(AuthContext);
}