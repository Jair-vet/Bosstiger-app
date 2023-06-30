import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


export const CartScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

  return (
    <section className="container md:pt-26 pt-36 flex items-center justify-center flex-col">
        <h1 className="text-center text-2xl uppercase font-sans font-bold">Shopping Cart</h1>
        { 
            cartItems.length === 0 
            ? (
                <div>
                    <p>Your Cart is empty</p>
                    <Link to='/'>
                        Go Back
                    </Link>
                </div>
            )
            : (
                <div className="md:flex md:flex-row md:gap-4 flex flex-col-reverse">
                    <div className="flex flex-col md:w-3/4 space-x-3 md:m-0 md:mb-0 mb-[100px] md:mx-0 mx-[20px] gap-4 md:h-0 h-screen">
                        { cartItems.map((item) => (
                            <ol key={item._id}>
                                <li>
                                    <div className="flex items-center md:flex-row flex-col shadow-lg rounded-b-lg">
                                        <img 
                                            src={item.image}
                                            className="w-[170px] rounded-xl shadow-xl m-5 duration-300 hover:-translate-y-3"
                                        />
                                        <div className="flex flex-col md:w-2/4 items-center">
                                            <p className="text-center text-coverColor font-bold m-2">{item.name}</p> 
                                            <p className="text-center m-2">{item.price}</p> 
                                            <select 
                                                className="w-32 bg-bgColor text-coverColor border-2 text-center 
                                                    rounded-md text-xl focus:outline-none focus:ring focus:ring-coverColor"
                                                value={item.qty}
                                                onChange={(e) => {  }}
                                            >
                                                { [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={ x + 1} value={ x + 1 }>
                                                        { x + 1 }
                                                    </option>
                                                )) }
                                            </select>
                                        </div>
                                        <div className="flex items-center p-4">
                                            <button 
                                                type="button"
                                                className="text-2xl duration-200 text-redColor hover:text-redColorLight hover:scale-125"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        ))}
                    </div>
                    <div className="md:w-2/4 border-2 rounded-xl p-20 mb-[100px] shadow-xl">
                        <h2 className="text-4xl text-secondaryColor">SubTotal <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} item</span></h2>
                    </div>
                </div>
            )
        }
    </section>
  )
}
