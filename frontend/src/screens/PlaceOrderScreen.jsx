import { FormContainer } from "../components/FormContainer"
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { CheckoutSteps } from "../components/CheckoutSteps";

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
            <div className="h-fit flex w-full items-center justify-center md:mt-[200px] mt-[100px]">
                <div className="w-1/2">
                    <h1>Col</h1>
                </div>
                <div className="w-1/2">
                    <h1>Col</h1>
                </div>
            </div>
            <FormContainer>
            </FormContainer>
            <CheckoutSteps step1 step2 step3 step4/>
        </>
    )
}
