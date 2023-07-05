import {  Link, useNavigate, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'

export const ProductScreen = () => {
    
    const { id: productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)

    const { data: product, isLoading, error } = useGetProductDetailsQuery( productId )

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }

    return (
        <>     
            {
                isLoading
                ? 
                    (
                        <div className='h-screen flex w-full items-center justify-center'>
                            <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                        </div>
                    )
                : error
                ? 
                    (
                        <div className='h-screen flex w-full items-center justify-center'>
                            <p className='text-3xl text-center font-bold text-redColor'>
                            { error?.data.message || error.error }
                            </p>
                        </div>
                    ) 
                :
                    (       
                        // {/* Producto */}
                        <div className='md:h-screen flex md:flex-col-reverse flex-col items-center justify-center'>
                            {/* Boton Regresar */}
                            <div className='flex md:w-full md:justify-end md:mr-5 mt-24'>
                                <Link to='/' 
                                    className=' bg-secondaryColor w-[200px] rounded-md py-4
                                    text-center shadow-xl transition duration-500 hover:-translate-y-3 hover:bg-primaryColor'>
                                    <span className='font-sans uppercase'>Regresar </span>
                                </Link>
                            </div>
                            {/* <!-- Global Container --> */}
                            <div className="flex items-center justify-center mt-7 md:mt-0">
                            {/* <!-- Card Container --> */}
                            <div className="flex flex-col md:p-16 md:m-6 space-y-18 rounded-2xl shadow-2xl 
                                        md:flex-row  md:space-x-10  bg-veryDarkBlue m-9">
                                {/* <!-- Image Div --> */}
                                <div className='flex items-center mt-7 md:mt-0'>
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
                                        <div className="md:max-w-sm w-full text-2xl font-sans flex flex-col justify-start font-thin">
                                            <p>{product.name}</p>
                                        </div>

                                        {/* <!-- Price Container --> */}
                                        <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                                            <p className="text-5xl font-bold text-greenColor">${product.offert}</p>
                                            <p className="line-through text-redColor">${product.price}</p>
                                            <p className="text-sm font-medium text-grayColor md:w-[350px] md:m-0 m-[7rem]">
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
                                            <button 
                                                className="md:w-full transition-all duration-150 bg-buttonsColor uppercase font-sans border-b-8 border-b-buttonColor
                                                        rounded-lg group-hover:border-t-8 border-t-buttonsColor
                                                        group-hover:border-b-0 group-hover:bg-buttonsColor group-hover:border-t-buttonColor
                                                        group-hover:shadow-lg"
                                                onClick={addToCartHandler}
                                            >
                                                <div className="px-8 py-4 duration-150 bg-buttonsColor rounded-lg group-hover:bg-buttonsColor border-t-buttonsColor">
                                                    Add to cart
                                                </div>
                                            </button>
                                        }
                                        </div>
                                        {product.countInStock > 0 && (
                                            <div className="flex justify-center">
                                                <select 
                                                    className="w-32 bg-grayColor text-center rounded-md text-xl
                                                         focus:outline-none focus:ring focus:ring-violetColor"
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value)) }
                                                >
                                                    { [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={ x + 1} value={ x + 1 }>
                                                            { x + 1 }
                                                        </option>
                                                    )) }
                                                </select>
                                            </div>
                                        )}

                                    

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
                )
            }
            
        </>
    )
}
