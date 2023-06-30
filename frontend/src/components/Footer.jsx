import React from 'react'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
        <footer className="bg-primaryColor shadow dark:bg-gray-900 w-full">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="md:flex md:items-center md:justify-between">
                    {/* Logo */}
                    <h1 className='text-4xl p-4 text-lightColor text-center font-sans font-normal md:absolute right-[20px]'>Boos
                        <span className='text-secondaryColor font-bold'>Tiger</span>
                    </h1>
                    <ul className="flex md:flex-row flex-col gap-4 m-4 flex-wrap text-md items-center justify-center mb-6 font-medium text-gray-500 md:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="#features" className="footerEnlces mr-4 md:mr-6 font-sans">Instagram</Link>
                        </li>
                        <li>
                            <Link to="#features" className="footerEnlces mr-4 md:mr-6 font-sans">Facebook</Link>
                        </li>
                        <li>
                            <Link to="#download" className="footerEnlces mr-4 md:mr-6 font-sans">WhatsApp</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 md:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-md text-gray-500 md:text-center dark:text-gray-400 text-center">© 2023 <a href="#" className="hover:underline">BoosTiger</a>. All Rights Reserved.</span>
            </div>
        </footer>
    </>
  )
}
