import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';


export const PaymentScreen = () => {

    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
  
    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping');
      }
    }, [navigate, shippingAddress]);
  
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate('/placeorder');
    };

    return (
        <>
            <div>
                <h1>Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <label>Select Method</label>
                    <input 
                        
                    />
                </form>
                <button
                    type="submit"
                    className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                            transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                    // disabled={ isLoading }
                >
                    Continue
                </button>
                <CheckoutSteps step1 step2 step3/>
            </div>
        </>
    )
}
