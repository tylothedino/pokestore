import { Form, useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";


const Cart = () => {
    const user = useSelector((state) => state.session.user);

    const [total_price, setTotalPrice] = useState(0);
    const [amounts, setAmounts] = useState({});

    const cart = useLoaderData().cart.cart

    useEffect(() => {
        let total = 0
        cart?.products?.map((product) => {
            total += (product.product.price * product.amount)
        })
        setTotalPrice(total)
    }, [cart])

    if (!user) {
        return (
            <>
                <h2>401 Unauthorized</h2>
            </>
        )
    }




    const handleAmountChange = (productId, newAmount) => {
        setAmounts(prevAmounts => ({
            ...prevAmounts,
            [productId]: newAmount
        }));
    };


    const renderAmount = (max, product_id) => {
        const options = [];
        for (let i = 1; i <= max; i++) {
            options.push(<option key={`${product_id}_${i}`} value={i}>{i}</option>)
        }

        return options
    }



    return (
        <div>
            <div>
                {
                    cart?.products?.map((product) => (
                        <div key={`product_cart_${product.product.id}`}>
                            <h4>{product.amount}</h4>
                            <p>{product.product.name}</p>
                            <img src={product.product.image} />
                            <p>{product.product.price}</p>

                            <Form method="put" action={`/cart`}>
                                <select name="amount" defaultValue={product.amount} id="product_amount" value={amounts[product.product.id]} onChange={(e) => handleAmountChange(product.product.id, +e.target.value)}>
                                    {renderAmount(product.amount, product.product.id)}

                                </select>

                                <input type='hidden' value={product.product.id} name='product_id' />

                                <button
                                    type="submit"
                                    name='intent'
                                    value='remove-product'
                                >Remove</button>
                            </Form>

                        </div>
                    ))
                }
            </div>

            <h3>Total price: {total_price}</h3>
            <div>
                <Form method="delete" action={`/cart`}>
                    <button
                        type="submit"
                        name='intent'
                        value='clear-cart'
                    >Clear Cart</button>
                </Form>
            </div>
            <div>
                {
                    cart?.products?.length > 0 ?
                        <Form method="post" action={`/cart`}>
                            <button
                                type="submit"
                                name='intent'
                                value='purchase-product'
                            >Purchase</button>
                            <input type="hidden" value={user.orders.length} name="order_index" />
                        </Form> : ""
                }
            </div>
        </div>
    )
}
export default Cart;
