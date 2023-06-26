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
                <ul className="mt-3">
                    <li>
                        <Link 
                            to="/cart" 
                            className="text-xl uppercase text-lightColor font-bold font-sans"
                        ><i className='fas fa-shopping-cart'></i> Cart</Link>
                    </li>
                </ul>

                <div className="mobile-menu">
                <input type="checkbox" className="toggler" role="checkbox" aria-checked="false" tabIndex="0" />
                <div className="hamburger"><div></div></div>
                <div className="menu">
                    <div>
                    <div>
                        <ul>
                            <li><Link to="#courses" className='enlace'>Cart</Link></li>
                            <li><Link to="#header" className='enlace'>Sign In</Link></li>    
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </nav>
    </div>
  )
}
