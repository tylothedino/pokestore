import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { productActions } from "../Actions/products";
import { allProductsLoader } from "../Loaders/product";
import { useEffect, useState } from "react";



const SingleProduct = () => {
    const { products } = useLoaderData();
    const { product_num } = useParams();
    const user = useSelector((state) => state.session.user);

    const current_product = products.products[product_num - 1];
    const product_review = current_product.reviews;
    const product_category = current_product.category.split('-')

    product_category.map((product, index) => {
        product_category[index] = product.charAt(0).toUpperCase() + product.slice(1);
    })


    const [product_amount, set_amount] = useState(1);

    // console.log(current_product)
    console.log(user)
    // console.log(product_review)





    return (
        <div>

            <div>
                <h3>{current_product.name}</h3>
                <h4>{product_category.join(" ")}</h4>
                <p>{current_product.description}</p>
                <p>{current_product.effect}</p>
                <img src={current_product.image} />

                <p>¥{current_product.price}</p>
            </div>


            <div>
                <Form method='put' action={`/product/${product_num}`} >
                    <select name="amount" id="product_amount" value={product_amount} onChange={(e) => set_amount(+e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <input type='hidden' value={product_num} name="product_id" />
                    <button
                        type="submit"
                        name='intent'
                        value='add-product-to-cart'
                    >Add to Cart</button>

                </Form>

            </div>


            <div>
                {

                    product_review.map((review) => (
                        <div key={review.id}>
                            <h4>{review.name}</h4>
                            <p>{review.updated_at}</p>
                            <p>{review.owner.username}</p>
                            <p>{review.description}</p>
                            <p>{review.rating}</p>
                            <img src={review.image} />
                        </div>

                    ))
                }
            </div>

        </div>
    )

}


export default SingleProduct;
