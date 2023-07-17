import { Product } from '../components/Product'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'

export const HomePage = () => {

  const { pageNumber } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber })

  return (
    <>
      { 
        isLoading 
          ? 
            (
              <div className='h-screen flex w-full items-center justify-center'>
                <h2 className='text-3xl text-center font-bold text-darkColor'>Loading...</h2>
              </div>
            ) 
          : error 
          ? 
            (
              <div className='h-screen flex w-full items-center justify-center'>
                  <p className='text-3xl text-center font-bold text-redColor'>
                  { error?.data?.message || error.error }
                  </p>
              </div>
            ) 
          : 
            (<>
              <div className='p-2 container md:pt-26 pt-36'>
                  <h1 className='text-center text-2xl uppercase font-sans font-bold'>Lastest <span>Products</span></h1>
                  <div className='p-8 grid gap-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                      {data.products.map((product) => (
                          <Product
                              product={product}
                              key={product._id}
                          />
                      ))}
                  </div>

                  {/* Catalogo */}
                  {/* <Catalogo /> */}
              </div>
            </>) 
        }
      
    </>
  )
}
