import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (token) => {
        setCurrentUser(token);
        localStorage.setItem("userToken", token); // token'ı tarayıcıda saklama
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("userToken");
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
