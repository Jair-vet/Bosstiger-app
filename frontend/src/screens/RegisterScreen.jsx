import { useState, useEffect } from "react"
import { FormContainer } from "../components/FormContainer"
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


export const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
          } else {

            try {
              const res = await register({ name, email, password }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate(redirect);
            } catch (err) {
              toast.error(err?.data?.message || err.error);
            }
          }
    };

  return (
    <FormContainer>
        <h1 className="text-center text-3xl font-bold p-4 uppercase text-primaryColor">Register</h1>

        <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3 items-center">
                {/* Nombre */}
                <div className="flex flex-col w-full">
                    <label className="text-lightColor uppercase">Nombre</label>
                    <input 
                        className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                            focus:ring-primaryColor"
                        placeholder="Enter Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* Email */}
                <div className="flex flex-col w-full">
                    <label className="text-lightColor uppercase">Email</label>
                    <input 
                        className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                            focus:ring-primaryColor"
                        placeholder="Enter email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* Password */}
                <div className="flex flex-col w-full">
                    <label className="text-lightColor uppercase">Password</label>
                    <input 
                        className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                            focus:ring-primaryColor"
                        placeholder="Enter password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col w-full">
                    <label className="text-lightColor uppercase">Confirm Password</label>
                    <input 
                        className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                            focus:ring-primaryColor"
                        placeholder="Confirm password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                            transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                    disabled={ isLoading }
                >
                    Sign In
                </button>

                <div className='mt-2 p-3 flex'>
                    <p className='text-secondaryColor'>¿Already registered? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'} className='uppercase duration-300 hover:text-primaryColor underline'>Sign in</Link></p>
                </div>
            </div>
        </form>
    </FormContainer>
  )
}
