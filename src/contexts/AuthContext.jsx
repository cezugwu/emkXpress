import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import getRandomString from './RandomNumber';
import { UserContext } from './UserContext';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => localStorage.getItem('auth_') ? JSON.parse(localStorage.getItem('auth_')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('auth_') ? jwtDecode(localStorage.getItem('auth_')) : null);
    const {getCart, setCart, setTotaItem, setTotalPrice, appendCart, createCart, deleteCart} = useContext(CartContext);
    const {getUserInfo, getShipInfo, setShipInfo, setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();


   const signupUser = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const email = e.target.email.value;
        const password1 = e.target.password1.value;
        const password2 = e.target.password2.value;

        try {
            let response = await fetch(`http://127.0.0.1:8000/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username':username,
                    'first_name':first_name,
                    'last_name':last_name,
                    'email':email,
                    'password1': password1,
                    'password2': password2
                }),
            });

            let data = await response.json();

            if (response.ok) {  
                console.log("User Created:", data);
                navigate('/login')
            } else {
                console.log("Signup Failed:", data);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        }
    };




    const getUser = async (e) => {
        e.preventDefault();

        try {
            let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data)
                setAuth(data);
                setUser(jwtDecode(data.access))
                localStorage.setItem('auth_', JSON.stringify(data));

                await appendCart(data);
                await getUserInfo(data);
                await getShipInfo(data);

                let from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });

                await createCart();
                await getCart();
                await deleteCart();

            } else {
                console.log('failed to get user');
            }
        } catch (error) {
            console.log('unexpected error', error);
        }
    }

    const updateUser = async () => {
        const auth = JSON.parse(localStorage.getItem('auth_'));
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'refresh':auth.refresh})
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data);
                setAuth(data);
                localStorage.setItem('auth_', JSON.stringify(data));
            } else {
                console.log('failed to get user2');
            }
        } catch (error) {
            console.log('unexpected error', error);
        }
    }


    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth_'))
        if (authData) {
            updateUser();
            
            const interval = setInterval(() => {
                updateUser();
            }, (4*60*1000))

            return () => clearInterval(interval);
        }
    }, []);

    const logoutUser = () => {
        const runlogoutProcess = async () => {
            localStorage.removeItem('auth_');
            localStorage.removeItem('user_');
            localStorage.removeItem('ship_');
            localStorage.removeItem('search_');
            setAuth(null);
            setUser(null);
            setShipInfo('');
            setUserInfo('')

            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });

            if (localStorage.getItem('cart_code')) {
                localStorage.removeItem('cart_code');
            }

            setCart([]);
            setTotaItem(0);
            setTotalPrice(0);


            localStorage.setItem('cart_code', getRandomString());
            await createCart();
            await getCart();
        };
        runlogoutProcess();
    }

    return (
        <AuthContext.Provider value={{getUser, auth, user, logoutUser, signupUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
