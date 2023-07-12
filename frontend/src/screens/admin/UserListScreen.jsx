import React from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const UserListScreen = () => {
    
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
        try {
            await deleteUser(id);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };
  return (
    <>
      <div className="h-fit flex md:flex md:flex-row flex-col w-full items-center justify-center md:mt-[200px] mt-[100px]">
        <div>
          <h2 className="text-center text-3xl font-bold p-4 uppercase text-lightColor"><span className="text-primaryColor"> Usuarios</span></h2>
          {isLoading 
          ? (
              <div className='h-screen flex w-full items-center justify-center'>
                <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
              </div>
          )
          : error ? (
            <div className='h-screen flex w-full items-center justify-center'>
                <p className='text-3xl text-center font-bold text-redColor'>
                  { error?.data.message || error.error }
                </p>
            </div>
          ) :
          (
            <div className="p-4 flex items-center justify-center text-blueDark">
              <table>
                <thead>
                  <tr>
                    <th className="border border-lightColor text-blueDark">ID</th>
                    <th className="border border-lightColor text-blueDark">NAME</th>
                    <th className="border border-lightColor text-blueDark">EMAIL</th>
                    <th className="border border-lightColor text-blueDark">ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>

                        <td className="border-lightColor border-x px-1 py-2">{user._id}</td>
                        <td className="border-lightColor border-x px-1 py-2">{user.name}</td>
                        <td className="border-lightColor border-x px-1 py-2">
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td className="border-lightColor border-x px-1 py-2">
                            {user.isAdmin ? (
                                <FaCheck style={{ color: 'green' }} />
                            ) : (
                                <FaTimes style={{ color: 'red' }} />
                            )}
                        </td>
                        <td>
                            <Link to={`/admin/user/${user._id}/edit`} className='flex items-center justify-center duration-300 hover:scale-125'>
                                <button variant='light' className='btn-sm mx-2'>
                                    <FaEdit className='text-skyblueColor'/>
                                </button>
                            </Link>
                        </td>
                        <td>
                            <div className="flex items-center justify-center duration-300 hover:scale-125">
                                <button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                    >
                                    <FaTrash className='text-redColor' />
                                </button>
                            </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )

          }
        </div>
      </div>
    </>
  )
}
