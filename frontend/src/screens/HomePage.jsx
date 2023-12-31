import { Product } from '../components/Product'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Paginate } from '../components/Paginate'
import { ProductCarousel } from '../components/ProductCarousel'
import { Meta } from '../components/Meta'

export const HomePage = () => {

  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

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
              <Meta title='BoosTiger'/>
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
                  <Paginate 
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword ? keyword : ''}
                  />
              </div>
            </>) 
        }
        
      
    </>
  )
}
