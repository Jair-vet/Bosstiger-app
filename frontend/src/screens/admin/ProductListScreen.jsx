import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';


export const ProductListScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({
        pageNumber,
    });

    const [deleteProduct, { isLoading: loadingDelete }] =
        useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
        try {
            await deleteProduct(id);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };

    const [createProduct, { isLoading: loadingCreate }] =
        useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
        try {
            await createProduct();
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };


  return (
    <div>
        <h2 className="md:mt-[200px] mt-[100px] text-center text-3xl font-bold p-4 uppercase text-lightColor"><span className="text-primaryColor">Products</span></h2>
        <div className="h-fit flex md:flex md:flex-row flex-col w-full items-center justify-center">
            <div>
                {/* Create Product Button */}
                <div className='flex md:justify-end justify-center mb-5'>
                    <button
                        type="submit"
                        className='flex justify-center items-center text-lightColor ml-2 bg-secondaryColor uppercase rounded-md px-2 py-1 text-center shadow-xl 
                                transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                        onClick={createProductHandler}
                    >
                        <FaPlus className='mr-2'/> Create Product
                    </button>
                </div>
                {/* Loading Controls */}
                {loadingCreate &&  
                    <div className='h-screen flex w-full items-center justify-center'>
                        <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                    </div>
                }
                {loadingDelete && 
                    <div className='h-screen flex w-full items-center justify-center'>
                        <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                    </div>
                }
                {isLoading ? (
                    <div className='h-screen flex w-full items-center justify-center'>
                        <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
                    </div>
                ) : error ? (
                    <div className='h-screen flex w-full items-center justify-center'>
                        <p className='text-3xl text-center font-bold text-redColor'>
                        { error?.data.message || error.error }
                        </p>
                    </div>
                ) : (
                    <>
                    {/* Table whit all products */}
                    <div className="p-4 flex items-center justify-center text-blueDark">
                        <table>
                            <thead>
                                <tr>
                                    <th className="border border-lightColor text-blueDark">ID</th>
                                    <th className="border border-lightColor text-blueDark">NAME</th>
                                    <th className="border border-lightColor text-blueDark">PRICE</th>
                                    <th className="border border-lightColor text-blueDark">CATEGORY</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product) => (
                                    <tr key={product._id}>
                                        <td className="border-lightColor border-x px-3 py-2">{product._id}</td>
                                        <td className="border-lightColor border-x px-1 py-2">{product.name}</td>
                                        <td className="border-lightColor border-x px-3 py-2">${product.price}</td>
                                        <td className="border-lightColor border-x px-1 py-2">{product.category}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}/edit`} className='flex items-center justify-center duration-300 hover:scale-125'>
                                                <button variant='light' className='btn-sm mx-2'>
                                                    <FaEdit className='text-skyblueColor'/>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center duration-300 hover:scale-125">
                                                <button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={() => deleteHandler(product._id)}
                                                    >
                                                    <FaTrash className='text-redColor' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </>
                )}
                </div>
            </div>
    </div>
  )
}
