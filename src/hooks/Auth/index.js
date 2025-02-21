import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const Role = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER"
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const signIn = async ({ email, password }) => {

        if (email === "super@gmail.com" && password === "super123456") {
            setUser({
                autenticated: true,
                user: { id: 1, name: "Super Usuário", email },
                role: Role.SUPER,
            });
        } else if (email === "adm@gmail.com" && password === "adm123456") {
            setUser({
                autenticated: true,
                user: { id: 2, name: "Administrador", email },
                role: Role.ADM,
            });
        } else if (email === "user@gmail.com" && password === "user123456") {
            setUser({
                autenticated: true,
                user: { id: 3, name: "Usuário", email },
                role: Role.USER,
            });

        } else {
            setUser({
                autenticated: false,
                user: null,
                role: null,
            });
        }
    };

    const signOut = async () => {
    };

    useEffect(() => {
        console.log("AuthProvider: ", user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}