import {  Link, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const ProductScreen = () => {

    const [product, setProducts] = useState([])

    const { id: productId } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
        const { data } = await axios.get(`/api/products/${productId}`)

        setProducts(data)
        }

        fetchProducts()
    }, [productId])

    

    return (
        <>
            <div className='h-screen flex md:flex-col-reverse flex-col items-center justify-center'>
                {/* Boton Regresar */}
                <div className='flex md:w-full md:justify-end md:mr-5 mt-4'>
                    <Link to='/' 
                        className=' bg-secondaryColor w-[200px] rounded-md py-4
                        text-center shadow-xl transition duration-500 hover:-translate-y-3 hover:bg-primaryColor'>
                        <span className='font-sans uppercase'>Regresar </span>
                    </Link>
                </div>
                {/* Producto */}
                {/* <!-- Global Container --> */}
                <div className="flex items-center justify-center mt-7 md:mt-0">
                    {/* <!-- Card Container --> */}
                    <div className="flex flex-col md:p-16 md:m-6 space-y-10 rounded-2xl shadow-2xl 
                                md:flex-row  md:space-x-10  bg-veryDarkBlue">
                        {/* <!-- Image Div --> */}
                        <div className='flex items-center'>
                            <img src={`${product.image}`} 
                                alt="Image-product"
                                className="mx-auto duration-200 w-60  md:hover:scale-110 md:hover:-translate-y-6 
                                    rounded-md mt-4"/>
                        </div>

                        {/* <!-- Content --> */}
                        <div className="flex flex-col space-y-6">
                            {/* <!-- Label & Descripcion Container --> */}
                            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">

                                {/* <!-- Title --> */}
                                <div className="max-w-sm text-2xl font-sans flex justify-start font-thin">
                                    {product.name}
                                </div>

                                {/* <!-- Price Container --> */}
                                <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                                    <p className="text-5xl font-bold text-greenColor">${product.offert}</p>
                                    <p className="line-through text-redColor">${product.price}</p>
                                    <p className="text-sm font-medium text-grayColor md:w-[350px]">
                                        {product.description}
                                    </p>
                                </div>

                                {/* <!-- Button Group --> */}
                                <div className="group">
                                { product.countInStock === 0
                                    ? 
                                    <button className="md:w-full transition-all duration-150 bg-grayColor uppercase font-sans text-secondaryColor rounded-md">
                                        <div className="px-8 py-4 duration-150 bg-grayColor rounded-lg group-hover:bg-grayColor border-t-grayColor">
                                            No hay piezas en existencia
                                        </div>
                                    </button>

                                    : 
                                    <button className="md:w-full transition-all duration-150 bg-buttonsColor uppercase font-sans border-b-8 border-b-buttonColor
                                                    rounded-lg group-hover:border-t-8 border-t-buttonsColor
                                                    group-hover:border-b-0 group-hover:bg-buttonsColor group-hover:border-t-buttonColor
                                                    group-hover:shadow-lg">
                                        <div className="px-8 py-4 duration-150 bg-buttonsColor rounded-lg group-hover:bg-buttonsColor border-t-buttonsColor">
                                            Add to cart
                                        </div>
                                    </button>
                                }
                                </div>

                            

                                {/* <!-- Stock --> */}
                                <div className="flex md:items-center flex-col-reverse space-x-3 group items-center gap-3 md:justify-between">
                                    <div className='flex items-center gap-2'>
                                        <div className="w-3 h-3 rounded-full group-hover:animate-ping countInStock 
                                            {product.countInStock > 0 ? 'bg-greenColor' : 'bg-redColor'}">
                                        
                                        </div>
                                        <div className={`${product.countInStock > 0 
                                            ? 'bg-greenColor w-3 h-3 rounded-full group-hover:animate-ping countInStock ' 
                                            : 'bg-redColor w-3 h-3 rounded-full group-hover:animate-ping countInStock '}`}>
                                        </div>
                                        <div className="text-sm font-sans">{product.countInStock} piezas en stock</div>
                                    </div>
                                    <div>
                                        <Rating
                                            value={product.rating}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
