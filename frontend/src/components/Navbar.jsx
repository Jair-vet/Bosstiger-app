import React from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>        
        <nav className="navbar">
            <div className="flex md:justify-between nav-tool">
                {/* logo */}
                <Link to="/" className="flex items-center">
                    <h1 className='text-4xl text-lightColor font-sans font-normal mt-2'>Boos
                        <span className='text-primaryColor font-bold'>Tiger</span>
                    </h1>
                </Link>
            
                {/* Links */}
                <ul>
                    <li className='mt-3 flex justify-center items-center'>
                        <Link 
                            to="/cart" 
                            className="flex gap-2 text-xl uppercase text-lightColor font-bold font-sans md:mr-10"
                        ><FaShoppingCart /> Cart</Link>
                    </li>
                    <li className='mt-3 flex justify-center items-center'>
                        <Link 
                            to="/login" 
                            className="flex gap-2 text-xl uppercase text-lightColor font-bold font-sans"
                        ><FaUser /> Sign In</Link>
                    </li>
                </ul>

        </div>
        </nav>
    </>
  )
}
