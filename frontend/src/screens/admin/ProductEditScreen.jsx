import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { FormContainer } from '../../components/FormContainer';


export const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className='flex justify-center md:mt-[120px] mt-[100px]'>
        <Link 
            to='/admin/productlist'
            type="submit"
            className='mt-3 bg-secondaryColor uppercase rounded-md py-2 px-5 text-center shadow-xl 
                    transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
          >
              Go back
        </Link>
      </div>

      <div className="h-fit flex w-full items-center justify-center md:mt-[30px] mt-[100px] mb-10">
        <div className='shadow-xl p-4 rounded-xl bg-bgGray md:w-3/5 w-4/5'>
          <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-3 items-center">
                  {/* Nombre */}
                  <div className="flex flex-col w-full">
                      <label className="text-lightColor uppercase">Nombre</label>
                      <input 
                          className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                              focus:ring-primaryColor"
                          placeholder="Enter Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  {/* Precio */}
                  <div className="flex flex-col w-full">
                      <label className="text-lightColor uppercase">Precio</label>
                      <input 
                          className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                              focus:ring-primaryColor"
                          placeholder="Enter Price"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                      />
                  </div>
                  {/* Count in Stock */}
                  <div className="flex flex-col w-full">
                      <label className="text-lightColor uppercase">Count in Stock</label>
                      <input 
                          className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                              focus:ring-primaryColor"
                          type='number'
                          placeholder='Enter countInStock'
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                      />
                  </div>
                  {/* Category */}
                  <div className="flex flex-col w-full">
                      <label className="text-lightColor uppercase">Category</label>
                      <input 
                          className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                              focus:ring-primaryColor"
                          type='text'
                          placeholder='Enter category'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                      />
                  </div>
                  {/* Description */}
                  <div className="flex flex-col w-full">
                      <label className="text-lightColor uppercase">Descripcion</label>
                      <textarea 
                          className="bg-bgTextField text-secondaryColor p-3 rounded-md mb-3 shadow-md focus:outline-none focus:ring 
                              focus:ring-primaryColor"
                          placeholder="Enter description"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                  </div>
                  {/* Imagen */}
                  <div className="flex items-center flex-col w-full">
                      <label className="text-lightColor uppercase">Imagen</label>
                      <img 
                          src={image} 
                          variant="top" 
                          className='rounded-md mb-3 w-24 h-20 duration-200 md:hover:-translate-y-2 border shadow-md mt-3'
                          onChange={(e) => setImage(e.target.value)}
                      ></img>
                      {/* File Upload */}
                      <label className="w-1/2 flex flex-col items-center px-2 py-3 rounded-md shadow-md tracking-wide uppercase border border-primaryColor cursor-pointer duration-300 hover:bg-primaryColor hover:text-white">
                          <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                          </svg>
                          <span className="mt-2 text-base leading-normal">Select a file</span>
                          <input type='file' className="hidden" onChange={uploadFileHandler} />
                      </label>


                  </div>
                  <button
                      type="submit"
                      className='w-1/2 mt-3 bg-secondaryColor uppercase rounded-md py-2 text-center shadow-xl 
                              transition duration-500 hover:-translate-y-2 hover:bg-primaryColor'
                      disabled={ isLoading }
                  >
                      Update
                  </button>

              </div>
          </form>
        </div>
      </div>
    </>
  )
}
