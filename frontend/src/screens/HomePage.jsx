import { Product } from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

export const HomePage = () => {

  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <>
      { 
        isLoading 
          ? 
            (<h2>Loading...</h2>) 
          : error 
          ? 
            (<div className='h-screen items-center w-full justify-center'>
              <p className='text-3xl text-darkColor'>
                { error?.data.message || error.error }
              </p>
            </div>) 
          : 
            (<>
              <div className='p-2 container md:pt-26 pt-36'>
                  <h1 className='text-center text-2xl uppercase font-sans font-bold'>Lastest <span>Products</span></h1>
                  <div className='p-8 grid gap-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                      {products.map((product) => (
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
