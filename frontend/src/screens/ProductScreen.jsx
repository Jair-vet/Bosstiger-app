import {  useParams } from 'react-router-dom'
import products from '../products'

export const ProductScreen = () => {

    const { id: productId } = useParams()
    const product = products.find((p) => p._id === productId)
    console.log(product);

    return (
        <div>ProductScreen</div>
    )
}
