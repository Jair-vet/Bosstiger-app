import { FormContainer } from "../components/FormContainer"
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { CheckoutSteps } from "../components/CheckoutSteps";
import { Image } from "react-bootstrap";

export const PlaceOrderScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {

        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <>
            <div className="h-fit w-full items-center justify-center p-4 md:mt-[200px] mt-[100px]"> 
                <div className="flex md:flex md:flex-row flex-col">
                    <div className="md:w-1/2">
                       {/* Shipping */}
                        <div className="border-b border-buttonsColor">
                            <div className="text-buttonsColor p-4">
                                <h3 className="text-xl font-bold text-buttonsColor uppercase">Envío</h3>
                                <strong className="text-md uppercase text-coverColor">Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country} 
                            </div>
                        </div>
                        {/* Payment Method */}
                        <div className="border-b border-buttonsColor mt-3">
                            <div className="text-buttonsColor p-4">
                                <h3 className="text-xl font-bold text-buttonsColor uppercase">Metodo de Pago</h3>
                                <strong className="text-md uppercase text-coverColor">Metodo: </strong>
                                {cart.paymentMethod}
                            </div>
                        </div>
                        {/* Order Items */}
                        <div className="w-full border-b border-buttonsColor mt-3">
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-buttonsColor uppercase md:text-left text-center">Order Items</h3>
                                {cart.cartItems.length === 0 ? (
                                    <h2>Your Cart is Empty</h2>
                                )
                                : (
                                    <div>
                                        {cart.cartItems.map((item, index) => (
                                            <div key={index}>
                                                <div className="mt-5 flex flex-col md:flex-row items-center">
                                                    <div className="md:w-1/3 duration-300 hover:-translate-y-2">
                                                        <Link to={`/product/${item._id}`}>
                                                            <Image 
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-28 rounded-md shadow-xl"
                                                                    >
                                                            </Image>
                                                        </Link>
                                                    </div>
                                                    <div className="md:w-1/3 flex items-center">
                                                        <p className="md:w-2/3 text-buttonsColor product-title ml-2">{item.name}</p> 
                                                    </div>
                                                    <div className="flex md:w-2/3 items-center">
                                                        <strong className="text-md uppercase text-coverColor mr-2">Total: </strong>
                                                        <p className="text-buttonsColor">{' '} {item.qty} x ${item.price} = ${item.qty * item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                                }
                            </div>
                        </div> 
                    </div>
                    {/* Info Shipping Containe */}
                    <div className="md:w-2/5 ml-8">
                    {/* Title */}
                    <h2 className="text-center text-2xl font-bold text-buttonsColor uppercase">Order Summary</h2>
                        {/* Order Summary */}
                        <div className="shadow-xl p-4 rounded-xl bg-bgGray">
                            {/* Items */}
                            <div className="text-buttonsColor p-4 flex">
                                <h3 className="w-1/2 text-xl font-bold text-buttonsColor">Items</h3>
                                <p className="text-coverColor text-end">{cart.cartItems.length}</p>
                            </div>
                            {/* Shipping */}
                            <div className="text-buttonsColor p-4 flex">
                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Shipping</h2>
                                <p>${cart.shippingPrice}</p>
                            </div>
                            {/* Tax */}
                            <div className="text-buttonsColor p-4 flex">
                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Tax</h2>
                                <p>${cart.taxPrice}</p>
                            </div>
                            {/* Total */}
                            <div className="text-buttonsColor p-4 flex">
                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Total</h2>
                                <p>${cart.totalPrice}</p>
                            </div>
                            {/* Place Order Button */}
                            <div className="flex items-center justify-center">
                                <button
                                    type="button"
                                    className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                                            transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="h-fit">
                <CheckoutSteps step1 step2 step3 step4  className="h-24 mb-36"/>
            </div>
            </div>
        </>
    )
}
