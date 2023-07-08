import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
//   useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { Image } from "react-bootstrap";

export const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

  
    return (
        <>
            {isLoading 
                ? (
                    <div className='h-screen flex w-full items-center justify-center'>
                        <p className='text-3xl text-center font-bold text-redColor'>
                        { error?.data.message }
                        </p>
                    </div>
                )
                : (
                    <>
                        <h1 className='text-center md:text-3xl text-xl font-bold text-buttonsColor uppercase md:mt-[120px] mt-[100px]'>Orden: 
                            <span className='uppercase text-coverColor'>{' '}{order._id}</span>
                        </h1>
                        <div className='h-fit flex items-center justify-center mt-8 p-4'>
                            <div className='flex flex-col w-full md:flex md:flex-row '>
                                {/* First Card Info */}
                                <div className='md:w-[800px] flex flex-col p-4 '>
                                    <h2 className='text-xl font-bold text-primaryColor uppercase text-center'>Shipping</h2>
                                    {/* Shipping Box */}
                                    <div className='flex flex-col shadow-xl rounded-xl bg-bgGray p-4 justify-end'>
                                        {/* Addres Info Container */}
                                        <div>
                                            <h2 className='mr-2 font-bold text-secondaryColor'>Address Info</h2>
                                            <p className='font-bold text-buttonsColor'>
                                                Name:<strong className='text-coverColor'> {order.user.name}</strong>
                                            </p>
                                            <p className='font-bold text-buttonsColor'>
                                                Email:<strong className='text-coverColor'> {order.user.email}</strong>
                                            </p>
                                            <p className='font-bold text-buttonsColor w-[13rem]'>
                                                Address:
                                                <strong className='text-coverColor'>  {order.shippingAddress.address},{' '}
                                                    {order.shippingAddress.city}{' '}
                                                    {order.shippingAddress.postalCode},{' '}
                                                    {order.shippingAddress.country}
                                                </strong>
                                            </p>
                                            {/* Delivery Status */}
                                            <div>
                                                {order.isDelivered ? (
                                                    <div className='flex p-4 justify-end'>
                                                        <p className='mr-2 font-bold text-buttonsColor'>Delivered on</p>
                                                        <p className='text-greenPrice'>{order.deliveredAt}</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex p-4 justify-end'>
                                                        <p className='mr-2 font-bold text-buttonsColor'>Status: </p>
                                                        <p className='text-redColor'>
                                                            Not Delivered
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Container Payment */}
                                        <div className='flex flex-col'>
                                            <h2 className='mr-2 font-bold text-secondaryColor'>Payment Method</h2>
                                            <p className='font-bold text-buttonsColor'>
                                                Method: <strong className='text-coverColor'>{order.paymentMethod}</strong>
                                            </p>
                                            <div>
                                                {order.isPaid ? (
                                                    <div className='flex mt-3'>
                                                        <p className='mr-2 font-bold text-buttonsColor'>Paid on</p>
                                                        <p className='text-greenPrice'>{order.paidAt}</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex'>
                                                        <p className='mr-2 font-bold text-buttonsColor'>Status: </p>
                                                        <p className='text-redColor'>
                                                            Not Paid
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Order Items Container */}
                                        <div className='flex flex-col mt-4'>
                                            <h2 className='mr-2 font-bold text-secondaryColor'>Order Items</h2>
                                            {order.orderItems.lenght === 0 ? (
                                                <div className='flex'>
                                                    <p className='mr-2 font-bold text-buttonsColor'>Status: </p>
                                                    <p className='text-redColor'>
                                                        Order is empty
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {order.orderItems.map((item, index) => (
                                                        <div key={index}>
                                                            <div className="mt-5 flex flex-col md:flex-row items-center">
                                                                <div className="md:w-1/3 duration-300 hover:-translate-y-2">
                                                                    <Link to={`/product/${item.product}`}>
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
                                                                <div className="flex md:w-3/4 items-center flex-col">
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
                                {/* Second Card Info */}
                                <div className='md:w-1/3 md:mt-0 mt-8 p-4'>
                                    {/* Title */}
                                    <h2 className='text-xl font-bold text-primaryColor uppercase text-center'>Order Summary</h2>
                                    {/* Info Shipping Containe */}
                                    <div>
                                        {/* Order Summary */}
                                        <div className="shadow-xl p-4 rounded-xl bg-bgGray">
                                            {/* Items */}
                                            <div className="text-buttonsColor flex">
                                                <h3 className="w-1/2 text-xl font-bold text-buttonsColor">Items</h3>
                                                <p className="text-coverColor text-end">{order.orderItems.length}{' '}{order.orderItems.lenght <= 1 ? 'product' : 'products' }</p>
                                            </div>
                                            {/* Shipping */}
                                            <div className="text-buttonsColor flex">
                                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Shipping</h2>
                                                <p>${order.shippingPrice}</p>
                                            </div>
                                            {/* Tax */}
                                            <div className="text-buttonsColor flex">
                                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Tax</h2>
                                                <p>${order.taxPrice}</p>
                                            </div>
                                            {/* Total */}
                                            <div className="text-buttonsColor flex">
                                                <h2 className="w-1/2 text-xl font-bold text-buttonsColor text-left">Total</h2>
                                                <p>${order.totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </>
                )
            }
        </>
    )
}
