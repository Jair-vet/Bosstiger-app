import React from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Dropdown } from './Dropdown';
import { AdminDropdown } from './AdminDropdown';
import { SearchBox } from './SearchBox';

export const Navbar = () => {

    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)

    const logoutHandler = () => {
        console.log('Logout');
    }

  return (
    <>        
        <nav className="navbar">
            {/* logo */}
            <div className='text-center'>
                <Link to="/">
                    <h1 className='text-4xl text-lightColor font-sans font-normal'>Boos
                        <span className='text-primaryColor font-bold'>Tiger</span>
                    </h1>
                </Link>
            </div>
            
            <div className="md:flex md:flex-row md:justify-between flex flex-col justify-between">
                {/* Links */}
                <div className='flex justify-center items-center'>
                    <ul>
                        <li className='flex justify-center items-center'>
                            <Link 
                                to="/cart" 
                                className="flex gap-2 text-xl uppercase text-lightColor font-bold font-sans md:mr-10"
                                >
                                {
                                    cartItems.length > 0 && (
                                        <div className='relative mr-[-16px] flex justify-center items-center'>
                                            <button className=' text-primaryColor text-xl rounded-full
                                                px-2'>
                                                { cartItems.reduce((a, c) => a + c.qty, 0) }
                                            </button>
                                        </div>
                                    )
                                }
                                <FaShoppingCart /> Cart
                            </Link>
                        </li>
                        <li className='flex justify-center items-center'>
                            <Link 
                                to="/login" 
                                className="flex gap-2 text-xl uppercase text-lightColor font-bold font-sans"
                            ><FaUser /> Sign In</Link>
                        </li>
                        <li>
                            <SearchBox />
                        </li>
                    </ul>
                </div>
                <div className='flex justify-center items-center'>
                    { userInfo 
                        ? (
                            <>
                                <Dropdown 
                                    user={userInfo}
                                />
                            </>
                        )
                        : (
                            <>
                               
                            </>
                        ) 
                    }
                    <div>
                        {userInfo && userInfo.isAdmin && (
                            <>
                                <AdminDropdown 
                                    title={ 'Admin' }
                                />
                            </>
                        )}
                    </div>
                </div>

        </div>
        </nav>
    </>
  )
}
