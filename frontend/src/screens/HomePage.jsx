import React from 'react'
import products from '../products'
import { Product } from '../components/Product'


export const HomePage = () => {
  return (
    <div className='p-2 container md:pt-26 pt-36'>
        <h1 className='text-center text-2xl uppercase font-sans font-bold'>Lastest <span>Products</span></h1>
        <div className='p-8 grid gap-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
            {products.map((product) => (
                <Product
                    product={product}
                    key={product._id}
                />
            ))}
        </div>

        {/* Catalogo */}
        {/* <Catalogo /> */}
    </div>
  )
}
