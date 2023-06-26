import React from 'react'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
        <footer className="py-12 bg-primaryColor">
            <div
                className="container flex flex-col items-center justify-between mx-auto space-y-16 px-6 
                    md:flex-row md:space-y-0">
                <div className="flex flex-col items-center justify-between space-y-8 text-lg font-light 
                    md:flex-row md:space-y-0 md:space-x-14 text-grayishBlue">
                    {/* Logo */}
                    <h1 className='text-4xl text-lightColor font-sans font-normal md:absolute right-[20px]'>Boos
                        <span className='text-secondaryColor font-bold'>Tiger</span>
                    </h1>
                    <Link to="#features" className="footerEnlces font-sans">Instagram</Link>
                    <Link to="#download" className="footerEnlces font-sans">WhatsApp</Link>
                    <Link to="#faq" className="footerEnlces font-sans">About Us</Link>
                </div>
            </div>
        </footer>
    </>
  )
}
