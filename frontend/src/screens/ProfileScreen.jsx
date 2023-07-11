import { FormContainer } from "../components/FormContainer"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';


export const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
  return (
    <div className="h-fit flex md:flex md:flex-row flex-col w-full items-center justify-center md:mt-[200px] mt-[100px]">
        <div className="shadow-xl p-4 rounded-xl bg-bgGray md:w-1/3 w-1/2">
            <div>
                <h2 className="text-center text-3xl font-bold p-4 uppercase text-lightColor">User<span className="text-primaryColor"> Profile</span></h2>

                <form onSubmit={submitHandler}>
                    {/* Name */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Nombre</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Email</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Password</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Confirm Password</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                                    transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                            disabled={ isLoading }
                        >
                            Update
                        </button>

                    </div>
                </form>
            </div>
        </div>
        <div className="w-1/2 shadow-xl p-4 rounded-xl bg-bgGray ml-3 md:mt-0 mt-8">
            Column
        </div>
    </div>
  )
}
