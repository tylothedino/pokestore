import { useLoaderData, useNavigate } from "react-router-dom";
import './style/CategoryProduct.css'

const CategoryProduct = () => {

    const { products } = useLoaderData();

    const nav = useNavigate();

    // console.log(products.products)

    return (
        <div className="category-product-container">
            {
                products.products.map((product) => (
                    <div key={product.name} className="product-container" onClick={(e) => { e.stopPropagation(); nav(`/product/${product.id}`) }} >
                        <img className="product-image" src={product.image} />
                        <p className="product-details">{product.name}</p>
                        <p className="product-details">¥{product.price}</p>
                        {
                            product.reviews.length > 0 &&
                            <p className="product-details">⭐{(product.reviews.reduce((accum, review) => (
                                accum + review.rating
                            ), 0) / product.reviews.length).toFixed(1)}</p>

                        }
                    </div>

                ))
            }

        </div>
    )

}


export default CategoryProduct
