import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { Image } from "react-bootstrap";

export const OrderScreen = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] =
        useDeliverOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPaypalClientIdQuery();

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPaypalScript = async () => {
            paypalDispatch({
            type: 'resetOptions',
            value: {
                'client-id': paypal.clientId,
                currency: 'USD',
            },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        if (order && !order.isPaid) {
            if (!window.paypal) {
            loadPaypalScript();
            }
        }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
        try {
            await payOrder({ orderId, details });
            refetch();
            toast.success('Order is paid');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        });
    }

    // TESTING ONLY! REMOVE BEFORE PRODUCTION
    async function onApproveTest() {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();

      toast.success('Order is paid');
    }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order
        .create({
            purchase_units: [
            {
                amount: { value: order.totalPrice },
            },
            ],
        })
        .then((orderID) => {
            return orderID;
        });
    }

    const deliverHandler = async () => {
        await deliverOrder(orderId);
        refetch();
    };

  
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
                                                        <p className='text-greenPrice'>{order.deliveredAt.substring(0, 10)}</p>
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
                                                        <p className='text-greenPrice'>{order.paidAt.substring(0, 10)}</p>
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
                                        <div className="shadow-xl p-4 rounded-xl bg-bgGray mt-2">
                                            {/* Items */}
                                            <div className="text-buttonsColor flex mt-4">
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

                                            {/* Payment method  */}
                                            {
                                                !order.isPaid && (
                                                    <div className='mt-8'>
                                                        {loadingPay && 
                                                            ( <div className='h-screen flex w-full items-center justify-center'>
                                                                <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                                                            </div>)
                                                        }
                                                        {isPending ?   
                                                            (<div className='h-screen flex w-full items-center justify-center'>
                                                                <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                                                            </div>) 
                                                        : (
                                                                <div>
                                                                    {/* <button onClick={ onApproveTest }>
                                                                        Test pay Order
                                                                    </button> */}
                                                                    <div>
                                                                        <PayPalButtons 
                                                                            createOrder={ createOrder }
                                                                            onApprove={ onApprove }
                                                                            onError={onError}
                                                                        >

                                                                        </PayPalButtons>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )}
                                            {/* Delivered status */}
                                            <div>
                                                { loadingDeliver && 
                                                    ( <div className='h-screen flex w-full items-center justify-center'>
                                                        <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                                                    </div>)
                                                }
                                                { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                                    <div className='flex items-center justify-center'>
                                                        <button
                                                            type="submit"
                                                            className='mt-4 text-lightColor ml-2 bg-secondaryColor uppercase rounded-md px-2 py-1 text-center shadow-xl 
                                                                    transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                                                            onClick={deliverHandler}
                                                        >
                                                            Mark as Delivered
                                                        </button>
                                                    </div>
                                                )}
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
