import React from 'react'
import { Link } from 'react-router-dom'

// import { ProductName } from './ProductName'
import { Rating } from './Rating'

export const Product = ({ product }) => {
  return (
    <>
        <div className='transition duration-500 hover:-translate-y-3'>
            <Link to={`/product/${product._id}`}>
                <img 
                    src={product.image} 
                    variant="top" 
                    className='object-cover rounded-t-md w-full h-[200px]'
                ></img>
                <div className='shadow-xl  rounded-b-lg'>
                    <div className='text-center p-3'>
                        <p className='text-buttonsColor font-bold product-title'>{product.name}</p> 
                    </div>
                    <div className='flex justify-around'>
                        <div> 
                            <p className='text-xl md:text-2xl text-greenPrice'>${product.offert}</p>
                            <p className='md:text-md text-grayColor line-through'>${product.price}</p>
                        </div>
                        <Rating 
                            value={product.rating}
                        />
                    </div>
                </div>
            </Link>
        </div>
    </>
  )
}