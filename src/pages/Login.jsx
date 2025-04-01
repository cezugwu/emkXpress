import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const {getUser} = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='fixed top-0 h-[60px] md:h-[75px] flex items-center shadow-2xl w-full bg-white  text-[0.85em] md:text-[1.1em]'>
                <div onClick={() => navigate('/')} className='mx-[20px] md:mx-[40px] lg:mx-[60px] h-[35px] h-[50px] font-semibold text-[1.1em] mt-[7px] cursor-pointer'>EMK-Xpress</div>
            </div>
            <div className='w-[300px] h-[300px] md:w-[350px] md:h-[350px] border shadow-2xl mt-[-70px] md:mt-[70px]  text-[0.9em] md:text-[1em]'>
                <div className='mx-2 my-3 mb-7 font-semibold'>Welcome Back</div>
                    <form onSubmit={getUser} className='flex flex-col justify-center items-center gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username">Username</label>
                            <input className='pl-2 w-[180px] md:w-[220px] h-[30px] rounded-[10px] border border-black border-[1.5px]' 
                                type="text"
                                name='username'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password">Password</label>
                            <input className='pl-2 h-[30px] md:w-[220px] w-[180px] rounded-[10px] border border-black border-[1.5px]' 
                                type="password"
                                name='password'
                                required />
                        </div>
                        <div className='my-1'><button>login</button></div>
                    </form>
                <div className='mx-2 my-3 mt-2'>don't have acount, <button onClick={() => navigate('/register')} className='hover:underline'>sign up</button></div>
            </div>
        </div>
    );
}

export default Login;
