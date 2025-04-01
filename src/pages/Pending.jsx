import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';


const Pending = () => {
    const [statusMessage, setStatusMessage] = useState('verifying your payment');
    const [statusSubMessage, setStatusSubMessage] = useState('wait a moment your payment is beign verified!');
    const location = useLocation();
    const {getCart, setCart, setTotaItem, setTotalPrice, createCart} = useContext(CartContext);
    const {getUserInfo} = useContext(UserContext);


    useEffect(() => {
        const verifyPay = async () => {
            const queryParams = new URLSearchParams(location.search);

            const status = queryParams.get('status');
            const tx_ref = queryParams.get('tx_ref');
            const transaction_id = queryParams.get('transaction_id');

            if (status && tx_ref && transaction_id) {
                try {
                    let response = await fetch(`http://127.0.0.1:8000/fluttercall/`, {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            status: status,
                            tx_ref: tx_ref,
                            transaction_id: transaction_id
                        }),
                    });
                    let data = await response.json();
                    if (response.status === 200){
                        setTotaItem(0);
                        setTotalPrice(0);
                        setCart([]);
                        setStatusMessage(data.message);
                        setStatusSubMessage(data.submessage);
                        await createCart();
                        await getUserInfo('');
                        await getCart();

                    } else {
                        setStatusMessage(data.message);
                        setStatusSubMessage(data.submessage);
                    }
                } catch (error) {
                    console.log('unexpected error', error)
                }
            }
        };
        verifyPay();
    }, [])
    

    useEffect(() => {
        const verifyPaystack = async () => {
            const searchParams = new URLSearchParams(location.search);
            const trxref = searchParams.get('trxref');
            const reference = searchParams.get('reference');

            if (trxref && reference) {
                try {
                    let response = await fetch(`http://127.0.0.1:8000/vpaystack/`, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({'reference':reference})
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        setTotaItem(0);
                        setTotalPrice(0);
                        setCart([]);
                        setStatusMessage(data.message);
                        setStatusSubMessage(data.submessage);
                        await createCart();
                        await getUserInfo('');
                        await getCart();

                    } else {
                        setStatusMessage(data.message);
                        setStatusSubMessage(data.submessage);
                    }
                } catch (error) {
                    console.log('unexpected error', error);
                }
            }
        };
        verifyPaystack();
    }, [])


    return (
        <div className='mt-[100px]'>
            <div>{statusMessage}</div>
            <div>{statusSubMessage}</div>
        </div>
    );
}

export default Pending;