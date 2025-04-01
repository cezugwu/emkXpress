import { jwtDecode } from 'jwt-decode';
import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';


export const PaymentContext = createContext();

const PaymentProvider = ({children}) => {
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('cart'));

    const fluterPay = async () => {
        const authData = JSON.parse(localStorage.getItem('auth_'));
        const user = authData ? jwtDecode(authData.access) : ''
        const shipInfo = localStorage.getItem('ship_') || '';

        if (cart.length <= 0) {
            return;
        }

        if (!shipInfo) {
            return navigate('/shipping');
        } else {
            if (!user) {
                return;
            } else {
                try {
                    const username = user.username;
                    let response = await fetch(`http://127.0.0.1:8000/flutter/`, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Bearer ${authData.access}`,
                        },
                        body:JSON.stringify({'username':username}),
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        console.log('initializing payment ...', data);
                        window.location.href = data.data.link
                    } else {
                        console.log('failed to initialize payment', data);
                    }
                } catch (error) {
                    console.log('unexpected error', error)
                }
            }
        }
    }

    const paystackPay = async () => {
        const authData = JSON.parse(localStorage.getItem('auth_'));
        const user = authData ? jwtDecode(authData.access) : ''
        const shipInfo = localStorage.getItem('ship_') || '';

        if (cart.length <= 0) {
            return;
        }
        
        if (!shipInfo) {
            return navigate('/shipping');
        } else {
            if (!user) {
                return;
            } else {
                try {
                    const username = user.username;
                    let response = await fetch(`http://127.0.0.1:8000/paystack/`, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Bearer ${authData.access}`,
                        },
                        body:JSON.stringify({'username':username}),
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        window.location.href = data.data.authorization_url;
                    } else {
                        console.log('failed to initialize payment', data);
                    }
                } catch (error) {
                    console.log('unexpected error', error)
                }
            }
        }
    }

    return (
        <PaymentContext.Provider value={{fluterPay, paystackPay}}>
            {children}
        </PaymentContext.Provider>
    );
}

export default PaymentProvider;