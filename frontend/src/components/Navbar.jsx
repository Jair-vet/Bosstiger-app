import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>        
        <nav className="navbar">
            <div className="flex md:justify-between nav-tool">
                {/* logo */}
                <Link to="/" className="flex items-center">
                    <h1 className='text-4xl text-lightColor font-sans font-normal mt-2'>Boos
                        <span className='text-primaryColor font-bold'>Tiger</span>
                    </h1>
                </Link>
            
                {/* Links */}
                <ul className="md:mt-3 mt-5">
                    <li>
                        <Link 
                            to="/cart" 
                            className="text-xl uppercase text-lightColor font-bold font-sans"
                        > Cart</Link>
                    </li>
                </ul>

        </div>
        </nav>
    </div>
  )
}
