import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addToCart, removeFromCart } from '../slices/cartSlice';

export const CartScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
      };


  return (
    <section className="container md:pt-26 pt-36 flex items-center justify-center flex-col">
        <h1 className="text-center text-2xl uppercase font-sans font-bold">Shopping Cart</h1>
        { 
            // If cart is empty
            cartItems.length === 0 
            ? (
                <div className="p-4">
                    <p className="text-4xl font-bold uppercase text-redColor">Your Cart is empty</p>
                    {/* Go back button */}
                    <div className='flex w-full justify-center mr-5 mt-24'>
                        <Link to='/' 
                            className=' bg-secondaryColor w-[200px] rounded-md py-4
                            text-center shadow-xl transition duration-500 hover:-translate-y-3 hover:bg-primaryColor'>
                            <span className='font-sans uppercase'>Go back</span>
                        </Link>
                    </div>
                </div>
            )
            : (
                // If not is empty
                <div className="md:flex md:flex-row md:gap-4 flex flex-col-reverse">
                    {/* container list products  */}
                    <div className="flex flex-col md:w-3/4 space-x-3 md:m-0 md:mb-0 mb-[100px] md:mx-0 mx-[20px] gap-4 md:h-0 h-screen">
                        { cartItems.map((item) => (
                            // each product using Order List
                            <ol key={item._id}>
                                <li>
                                    {/* Container product */}
                                    <div className="flex items-center md:flex-row flex-col shadow-lg rounded-b-lg">
                                        {/* Image Product */}
                                        <img 
                                            src={item.image}
                                            className="w-[170px] rounded-xl shadow-xl m-5 duration-300 hover:-translate-y-3"
                                        />
                                        {/* Container Info */}
                                        <div className="flex flex-col md:w-2/4 items-center">
                                            <Link to={`/product/${item._id}`} className="text-center text-coverColor font-bold m-2 hover:underline">{item.name}</Link>
                                            <p className="text-center m-2">{item.price}</p> 
                                           {/* Select items */}
                                            <select 
                                                className="w-32 bg-bgColor text-coverColor border-2 text-center 
                                                    rounded-md text-xl focus:outline-none focus:ring focus:ring-coverColor"
                                                value={item.qty}
                                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                            >
                                                { [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={ x + 1} value={ x + 1 }>
                                                        { x + 1 }
                                                    </option>
                                                )) }
                                            </select>
                                        </div>
                                        {/* Remove Button */}
                                        <div className="flex items-center p-4">
                                            <button 
                                                type="button"
                                                className="text-2xl duration-200 text-redColor hover:text-redColorLight hover:scale-125"
                                                onClick={() => removeFromCartHandler(item._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        ))}
                    </div>
                    {/* Subtotal Container */}
                    <div className="md:w-2/4 rounded-xl mb-[100px] shadow-xl outline-none ring ring-coverColor">
                        <h2 className="text-2xl m-2 text-center text-secondaryColor">Subtotal (<span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</span></h2>
                        {/* Total */}
                        <p className="text-center text-greenColor text-lg">
                            <span className="text-secondaryColor">Total: </span>
                            $ { cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)    
                            }
                        </p>
                        {/* Proceed button */}
                        <div className="flex items-center justify-center">
                            <button 
                                className={cartItems === 0 
                                    ? 'bg-grayColor w-3/4 m-5 p-1 rounded-md shadow-lg'
                                    : 'bg-primaryColor w-3/4 m-5 p-1 rounded-md duration-300 hover:bg-primaryColorDark hover:-translate-y-2 shadow-lg' 
                                }
                                disabled={cartItems === 0}

                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </section>
  )
}
