import {createContext, useContext, useState} from "react";
import {authApi} from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const user = await authApi.login(data);
            setCurrentUser(user);
            return user;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const user = await authApi.register(data);
            setCurrentUser(user);
            return user;
        } finally {
            setLoading(false)
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

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

export function useAuth(){
    return useContext(AuthContext);
}