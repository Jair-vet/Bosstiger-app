import { Link } from "react-router-dom"


export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
        <div className="mt-7 md:flex md:flex-row flex flex-col items-center justify-center w-full">
            <div className="md:relative md:mt-[2rem] md:w-32 w-96">
                {
                    step1 
                    ? (
                        <Link to='/login'>
                            <button className="text-2xl w-full p-2 md:rounded-l-md md:rounded-none rounded-t-md py-2 text-center 
                                uppercase transition duration-500 hover:bg-primaryColorDark bg-primaryColor">
                                Sign In
                            </button>
                        </Link>
                    )
                    : (
                        <Link>
                            <button disabled className="text-2xl w-full p-2 py-2 text-center md:rounded-l-md md:rounded-none rounded-t-md
                                uppercase bg-bgGray text-bgTextField cursor-not-allowed">
                                Sign In
                            </button>
                        </Link>
            
                    )
                }
            </div>
            <div className="md:relative md:mt-[2rem] md:w-32 w-96">
                {
                    step2 
                    ? (
                        <Link to='/shipping'>
                            <button  className="text-2xl w-full p-2 py-2 text-center 
                                uppercase transition duration-500 hover:bg-primaryColorDark bg-primaryColor">
                            Shipping
                            </button>
                        </Link>
                    )
                    : (
                        <Link>
                            <button disabled className="text-2xl w-full p-2 py-2 text-center 
                                uppercase bg-bgGray text-bgTextField cursor-not-allowed">
                                Shipping
                            </button>
                        </Link>
                    )
                }
            </div>
            <div className="md:relative md:mt-[2rem] md:w-32 w-96">
                {
                    step3 
                    ? (
                        <Link to='/payment'>
                            <button className="text-2xl w-full p-2 py-2 text-center 
                                uppercase transition duration-500 hover:bg-primaryColorDark bg-primaryColor">
                            Payment
                            </button>
                        </Link>
                    )
                    : (
                        <button disabled className="text-2xl w-full p-2 py-2 text-center 
                            uppercase bg-bgGray text-bgTextField cursor-not-allowed">
                            Payment
                        </button>
                    )
                }
            </div>
            <div className="md:relative md:mt-[2rem] md:w-48 w-96">
                {
                    step4 
                    ? (
                        <Link to='/placeorder'>
                            <button  className="text-2xl md:w-48 w-full p-2 py-2 text-center whitespace-nowrap
                                md:rounded-r-md md:rounded-none rounded-b-md uppercase transition duration-500 hover:bg-primaryColorDark bg-primaryColor">
                                Place Order
                            </button>
                        </Link>
                    )
                    : (
                        <Link>
                            <button disabled className="text-2xl w-full p-2 py-2 text-center md:rounded-r-md rounded-b-md whitespace-nowrap
                                md:rounded-none uppercase bg-bgGray text-bgTextField cursor-not-allowed">
                                Place Order
                            </button>
                        </Link>
                    )
                }
            </div>
        </div>
    </>
  )
}
