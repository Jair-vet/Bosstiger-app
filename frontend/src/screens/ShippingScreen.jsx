import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';

import { CheckoutSteps } from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

export const ShippingScreen = () => {
    
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

        
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

  return (
    <>
        <FormContainer>

            <form onSubmit={submitHandler}>
                <div className="flex flex-col gap-3 items-center">
                    {/* Address */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Direccion</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Adress"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    {/* Address */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Ciudad</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter City"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    {/* Address */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Codigo Postal</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Postal Code"
                            type="text"
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                    </div>
                    {/* Country */}
                    <div className="flex flex-col w-full">
                        <label className="text-lightColor uppercase">Pais</label>
                        <input 
                            className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                                focus:ring-primaryColor"
                            placeholder="Enter Postal Code"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    {/* Confirm */}
                    <button
                        type="submit"
                        className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                                transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                        // disabled={ isLoading }
                    >
                        Continue
                    </button>
                </div>
            </form>
        </FormContainer>
        <CheckoutSteps step1 step2 />
    </>
  )
}
