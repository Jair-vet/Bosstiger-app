import {  Link, useNavigate, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

export const ProductScreen = () => {
    
    const { id: productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
        await createReview({
            productId,
            rating,
            comment,
        }).unwrap();
        refetch();
        toast.success('Review created successfully');
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    };

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
                            <div className='md:mt-[500px] mt-[10px]'>
                                {/* <!-- Global Container --> */}
                                <div className="flex flex-col items-center justify-center mt-7 md:mt-0">
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

                                {/* Review  */}
                                <div className='md:w-full flex flex-col gap-4 md:h-fit h-[300px] md:items-start items-center'>
                                    {/* Review text */}
                                    <div className='md:w-full flex flex-col gap-4'>
                                        {/* if Not review */}
                                        <div className='w-80 bg-bgTextField rounded-md outline-none ring-1 ring-bgColor shadow-md'>
                                            <h2 className='p-2 text-xl text-grayColor'>Reviews</h2>
                                            {product.reviews.lenght === 0 && <p>No Reviews</p>}
                                        </div>
                                        <div className='w-80 bg-blue rounded-md outline-none ring-1 ring-borderBlue shadow-md'>
                                            <div className='flex p-3'>
                                                {product.reviews.map((review) => (
                                                    <ul key={review._id}>
                                                        <li>
                                                            <div className='flex justify-between'>
                                                                <strong className='font-bold'>{review.name}</strong>
                                                                <p className='text-end'>{review.createdAt.substring(0, 10)}</p>
                                                            </div>
                                                            <Rating value={review.rating}/>
                                                            <p className='text-borderBlue'>{review.comment}</p>
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                         {/* Boton Regresar */}
                                        <div className='flex md:w-full md:justify-end md:mr-5'>
                                            <Link to='/' 
                                                className=' bg-secondaryColor w-[200px] rounded-md py-4
                                                text-center shadow-xl transition duration-500 hover:-translate-y-3 hover:bg-primaryColor'>
                                                <span className='font-sans uppercase'>Regresar </span>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Reviwe Container */}
                                    <div className="h-fit flex items-center md:mt-[30px] mt-[30px]">
                                        {/* Container */}
                                        <div className='shadow-xl md:w-[500px] p-4 rounded-xl bg-bgGray flex flex-col mb-10'>
                                            {/* Title */}
                                            <div className='md:w-full'>
                                                <h2 className='p-2 text-2xl text-center text-grayColor'>Escribe una Reseña</h2>
                                                {loadingProductReview && <div className='h-screen flex w-full items-center justify-center'>
                                                                            <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                                                                        </div>
                                                }
                                            </div>

                                            {userInfo 
                                                ?(
                                                    // Form to do a review
                                                    <form onSubmit={submitHandler}>
                                                        {/* Raiting */}
                                                        <div className='flex flex-col m-4'>
                                                            <label className='text-primaryColor uppercase'>Rating</label>
                                                            <select className="w-full bg-bgTextField p-2 text-center rounded-md text-xl
                                                                focus:outline-none focus:ring focus:ring-borderBlue text-grayColor"
                                                                required
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value='' >Select...</option>
                                                                <option value='1'>Poor</option>
                                                                <option value='2'>Fair</option>
                                                                <option value='3'>Good</option>
                                                                <option value='4'>Very Good</option>
                                                                <option value='5'>Excellent</option>
                                                            </select>
                                                        </div>

                                                        {/* Coments */}
                                                        <div className='flex flex-col m-4'>
                                                            <label className='text-primaryColor uppercase'>Coment</label>
                                                            <textarea
                                                                className='bg-bgTextField text-grayColor h-20'
                                                                required
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            >

                                                            </textarea>
                                                        </div>

                                                        {/* Button */}
                                                        <div className='flex justify-center'>
                                                            <button
                                                                disabled={loadingProductReview}
                                                                type='submit'
                                                                className=' bg-secondaryColor w-[200px] rounded-md py-3
                                                                text-center shadow-xl transition duration-500 hover:-translate-y-1 hover:bg-primaryColor'>
                                                                <span className='font-sans uppercase'>Enviar </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) 
                                                :
                                                (
                                                    <div>
                                                        <p className='text-center text-grayColor'>Please <Link to='/login' className='border-b text-primaryColor'>sign in</Link> to write a review </p>
                                                    </div>
                                                )
                                            }
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
