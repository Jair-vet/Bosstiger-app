import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';


export const UserEditScreen = () => {

    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        await updateUser({ userId, name, email, isAdmin });
        toast.success('user updated successfully');
        refetch();
        navigate('/admin/userlist');
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (user) {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        }
    }, [user]);

  return (
    <>
        <h2 className="md:mt-[200px] mt-[100px] text-center text-3xl font-bold p-4 uppercase text-lightColor"><span className="text-primaryColor">Products</span></h2>
        <div className='flex justify-center md:mt-[10px] mt-[100px]'>
            <Link 
                to='/admin/userlist'
                type="submit"
                className='mt-3 bg-secondaryColor uppercase rounded-md py-2 px-5 text-center shadow-xl 
                        transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
            >
                Go back
            </Link>
        </div>

        <div className="h-fit flex w-full items-center justify-center md:mt-[30px] mt-[100px] mb-10">
            <div className='shadow-xl p-4 rounded-xl bg-bgGray md:w-3/5 w-4/5'>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Email Address</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Price"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Is Admin */}
                    <div className="flex flex-row">
                        <label className='mr-10 text-lg uppercase font-bold'> es Admin </label>
                        <input 
                            className='w-5 border-none outline-none'
                            type="checkbox" 
                            checked={isAdmin} 
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </div>

                    {/* Button */}
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
    </>
  )
}
