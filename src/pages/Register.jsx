import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const {signupUser} = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className='w-full h-[700px] flex justify-center items-center mt-[80px] md:mb-[30px]'>
            <div className='fixed top-0 h-[60px] md:h-[75px] flex items-center shadow-2xl w-full bg-white  text-[0.85em] md:text-[1.1em]'>
                <div onClick={() => navigate('/')} className='mx-[20px] md:mx-[40px] lg:mx-[60px] h-[35px] h-[50px] font-semibold text-[1.1em] mt-[7px] cursor-pointer'>EMK-Xpress</div>
            </div>
            <div className='w-[300px] h-[520px] md:w-[350px] md:h-[570px] border shadow-2xl mt-[-70px] md:mt-[70px]  text-[0.9em] md:text-[1em]'>
                <div className='mx-2 my-3 mb-7 font-semibold'>Sign up</div>
                    <form onSubmit={signupUser} className='flex flex-col justify-center items-center gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username">Username</label>
                            <input className='pl-2 w-[180px] md:w-[220px] h-[30px] rounded-[5px] border border-black border-[1.5px]' 
                                type="text"
                                name='username'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username">First Name</label>
                            <input className='pl-2 w-[180px] md:w-[220px] h-[30px] rounded-[5px] border border-black border-[1.5px]' 
                                type="text"
                                name='first_name'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username">Last Name</label>
                            <input className='pl-2 w-[180px] md:w-[220px] h-[30px] rounded-[5px] border border-black border-[1.5px]' 
                                type="text"
                                name='last_name'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username">Email</label>
                            <input className='pl-2 w-[180px] md:w-[220px] h-[30px] rounded-[5px] border border-black border-[1.5px]' 
                                type="text"
                                name='email'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password">Password</label>
                            <input className='pl-2 h-[30px] md:w-[220px] w-[180px] rounded-[5px] border border-black border-[1.5px]' 
                                type="password"
                                name='password1'
                                required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password">Confirm Password</label>
                            <input className='pl-2 h-[30px] md:w-[220px] w-[180px] rounded-[5px] border border-black border-[1.5px]' 
                                type="password"
                                name='password2'
                                required />
                        </div>
                        <div className='my-1'><button>Register</button></div>
                    </form>
                <div className='mx-2 my-3 mt-2'>don't have acount, <button onClick={() => navigate('/login')} className='hover:underline'>sign in</button></div>
            </div>
        </div>
    );
}

export default Register;
