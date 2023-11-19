import React, { useState, useEffect, createContext, useCallback } from 'react'
import useAxios from './useAxios';
import { LOGIN_URL, LoginResponseRrops} from '../api/config';

interface User {
    id: number | undefined | null;
    email: string | undefined | null;
    permissions: string | undefined | null;
    provider_name: string | undefined | null;
    avatar_url: string | undefined | null;
    nickname: string | undefined | null;
    token: string | undefined | null;
}

interface AuthContext {
    user: User | undefined;
    login: (email: string, password: string) => void;
    logout: () => void;
    setLoginInfo: (response: LoginResponseRrops | undefined) => void;
    isLoading: boolean,
}

type UserProviderProps = {
    children: React.ReactNode;
};



export const UserContext = createContext<AuthContext>({
    user: undefined,
    login: () => { },
    logout: () => { },
    setLoginInfo: () => { },
    isLoading: false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const { fetchData, response, isLoading } = useAxios<LoginResponseRrops>()
    const [user, setUser] = useState<User>(
        {
            id: localStorage.getItem('id') ? parseInt(localStorage.getItem('id') as string) : null,
            email: localStorage.getItem('email'),
            avatar_url: localStorage.getItem('avatar_url'),
            nickname: localStorage.getItem('nickname'),
            provider_name: localStorage.getItem('provider_name'),
            permissions: localStorage.getItem('permissions'),
            token: localStorage.getItem('token')
        }
    );

    const setLoginInfo = useCallback((response?: LoginResponseRrops | undefined) => {
        console.log(response)
        if (response) {
            localStorage.setItem('id', response.id.toString());
            localStorage.setItem('nickname', response.nickname);
            localStorage.setItem('provider_name', response.provider_name);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('email', response.email);
            localStorage.setItem('avatar_url', response.avatar_url);
            localStorage.setItem('permissions', response.permissions);
            setUser({
                id: response.id,
                nickname: response.nickname,
                provider_name: response.provider_name,
                avatar_url: response.avatar_url,
                email: response.email,
                permissions: response.permissions,
                token: response.access_token,
            });
        }
    }, []);

    useEffect(() => {
        setLoginInfo(response)
    }, [response, setLoginInfo]);

    const login = async (email: string, password: string) => {
        await fetchData('POST', LOGIN_URL, { username: email, password: password }, headers)
    };

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('nickname');
        localStorage.removeItem('provider_name');
        localStorage.removeItem('avatar_url');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('permissions');
        setUser({
            id: undefined,
            nickname: undefined,
            provider_name: undefined,
            avatar_url: undefined,
            email: undefined,
            permissions: undefined,
            token: undefined,
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading, setLoginInfo }}>
            {children}
        </UserContext.Provider>
    );
}

