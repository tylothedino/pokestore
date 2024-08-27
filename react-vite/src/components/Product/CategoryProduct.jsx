import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {

    const { products } = useLoaderData();

    const nav = useNavigate();

    // console.log(products.products)

    return (
        <div>
            {
                products.products.map((product) => (
                    <div key={product.name} onClick={(e) => { e.stopPropagation(); nav(`/product/${product.id}`) }} style={{ border: "solid 2px black", marginTop: "2rem" }}>
                        <img src={product.image} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        {
                            product.reviews.length > 0 &&
                            <p>{(product.reviews.reduce((accum, review) => (
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
