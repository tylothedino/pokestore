import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";


const Cart = () => {
    const user = useSelector((state) => state.session.user);

    const [total_price, setTotalPrice] = useState(0);
    const cart = useLoaderData().cart.cart


    console.log(cart)


    useEffect(() => {
        let total = 0
        cart.products.map((product) => {
            total += (product.product.price * product.amount)
        })
        setTotalPrice(total)
    }, [cart])


    return (
        <div>
            <div>
                {
                    cart.products.map((product) => (
                        <div key={`product_cart_${product.product.id}`}>
                            <h4>{product.amount}</h4>
                            <p>{product.product.name}</p>
                            <p>{product.product.price}</p>
                        </div>
                    ))
                }
            </div>

            <h3>Total price: {total_price}</h3>

            <div>
                <Form method="post" action={`/cart`}>
                    <button
                        type="submit"
                        name='intent'
                        value='purchase-product'
                    >Purchase</button>
                </Form>
            </div>
        </div>
    )
}
export default Cart;
