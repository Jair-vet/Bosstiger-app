import { FormContainer } from "../../components/FormContainer"
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Link } from 'react-router-dom';

export const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <div className="h-fit flex md:flex md:flex-row flex-col w-full items-center justify-center md:mt-[200px] mt-[100px]">
        <div>
          <h2 className="text-center text-3xl font-bold p-4 uppercase text-lightColor"><span className="text-primaryColor"> Orders</span></h2>
          {isLoading 
          ? (
              <div className='h-screen flex w-full items-center justify-center'>
                <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
              </div>
          )
          : error ? (
            <div className='h-screen flex w-full items-center justify-center'>
                <p className='text-3xl text-center font-bold text-redColor'>
                  { error?.data.message || error.error }
                </p>
            </div>
          ) :
          (
            <div className="p-4 flex items-center justify-center text-blueDark">
              <table>
                <thead>
                  <tr>
                    <th className="border border-lightColor text-blueDark">ID</th>
                    <th className="border border-lightColor text-blueDark">USER</th>
                    <th className="border border-lightColor text-blueDark">DATE</th>
                    <th className="border border-lightColor text-blueDark">TOTAL</th>
                    <th className="border border-lightColor text-blueDark">PAID</th>
                    <th className="border border-lightColor text-blueDark">DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border-lightColor border-x px-1 py-2">{order._id}</td>
                      <td className="border-lightColor border-x px-1 py-2">{order.user && order.user.name}</td>
                      <td className="border-lightColor border-x px-1 py-2">{order.createdAt.substring(0, 10)}</td>
                      <td className="border-lightColor border-x px-1 py-2">${order.totalPrice}</td>
                      <td className="border-lightColor border-x px-1 py-2">
                          <div className="flex items-center justify-center">
                              {order.isPaid ? (
                                  <div className="text-greenBorder">
                                      {order.paidAt.substring(0, 10)}
                                  </div>
                              ) : (
                                  <FaTimes style={{ color: 'red' }} />
                              )}
                          </div>
                      </td>
                      <td className="flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                            ) : (
                                <FaTimes style={{ color: 'red' }} />
                            )}
                        </div>
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <button
                              type="submit"
                              className='text-lightColor ml-2 bg-secondaryColor uppercase rounded-md px-2 py-1 text-center shadow-xl 
                                      transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                          >
                              Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )

          }
        </div>
      </div>
    </>
  )
}
