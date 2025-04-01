import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(() => localStorage.getItem('user_') ? JSON.parse(localStorage.getItem('user_')) : '');
    const [shipInfo, setShipInfo] = useState(() => localStorage.getItem('ship_') ? JSON.parse(localStorage.getItem('ship_')) : '');
    const navigate = useNavigate();

    const getUserInfo = async (datas) => {
        const authData = JSON.parse(localStorage.getItem('auth_'));
        const user = authData ? jwtDecode(authData.access) : jwtDecode(datas.access);
        const king = authData ? authData.access : datas.access;
        const username = user.username;
        
        try {
            let response = await fetch(`http://127.0.0.1:8000/getuser/?username=${username}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${king}`
                }
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data);
                localStorage.setItem('user_', JSON.stringify(data));
                setUserInfo(data);
            } else {
                console.log('failed to fetch userinfo')
            }
        } catch (error) {
            console.log('unexpected error', error)
        }
    }


    const getShipInfo = async (datas) => {
        const authData = JSON.parse(localStorage.getItem('auth_'));
        const user = authData ? jwtDecode(authData.access) : jwtDecode(datas.access);
        const king = authData ? authData.access : datas.access;
        const username = user.username;
        try {
            let response = await fetch(`http://127.0.0.1:8000/getship/?username=${username}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${king}`
                }
            });
            let data = await response.json();
            if (response.status === 404) {
                console.log('you have no shipping information')
            }
            else if (response.status === 200) {
                console.log(data);
                localStorage.setItem('ship_', JSON.stringify(data));
                setShipInfo(data);
            } else {
                console.log('failed to fetch shipinfo')
            }
        } catch (error) {
            console.log('unexpected error', error)
        }
    }
    

    const postShippingInfo = async (e) => {
        e.preventDefault();

        const authData = JSON.parse(localStorage.getItem('auth_'))
        const user = authData ? jwtDecode(authData.access) : '';

        const address = e.target.address.value;
        const city = e.target.city.value;
        const state = e.target.state.value;
        const zip_code = e.target.zip_code.value;
        const phone = e.target.phone.value;
        const username = user.username;
        const country = e.target.country.value;
        const phone_code = e.target.phone_code.value;
        const contact_name = e.target.contact_name.value;

        try {
            let response = await fetch(`http://127.0.0.1:8000/shipinfo/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${authData.access}`
                },
                body:JSON.stringify({
                    'address':address,
                    'city':city,
                    'state':state,
                    'zip_code':zip_code,
                    'phone':phone,
                    'username':username,
                    'country':country,
                    'phone_code':phone_code,
                    'contact_name':contact_name,
                })
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data);
                await getShipInfo();
                navigate(-1);
            } else {
                console.log('failed to post shippinginfo')
            }
        } catch (error) {
            console.log('unexpected error', error)
        }
    }


    const updatepostShippingInfo = async (e) => {
        e.preventDefault();

        const authData = JSON.parse(localStorage.getItem('auth_'))
        const user = authData ? jwtDecode(authData.access) : '';

        const address = e.target.address.value;
        const city = e.target.city.value;
        const state = e.target.state.value;
        const zip_code = e.target.zip_code.value;
        const phone = e.target.phone.value;
        const username = user.username;
        const country = e.target.country.value;
        const phone_code = e.target.phone_code.value;
        const contact_name = e.target.contact_name.value;

        try {
            let response = await fetch(`http://127.0.0.1:8000/updateshipinfo/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${authData.access}`
                },
                body:JSON.stringify({
                    'address':address,
                    'city':city,
                    'state':state,
                    'zip_code':zip_code,
                    'phone':phone,
                    'username':username,
                    'country':country,
                    'phone_code':phone_code,
                    'contact_name':contact_name,
                })
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data);
                await getShipInfo();
                navigate(-1);
            } else {
                console.log('failed to update shippinginfo')
            }
        } catch (error) {
            console.log('unexpected error', error)
        }
    }

    return (
        <UserContext.Provider value={{getUserInfo, userInfo, postShippingInfo, getShipInfo, shipInfo, setShipInfo, setUserInfo, updatepostShippingInfo}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;