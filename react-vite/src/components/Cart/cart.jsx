import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import "./cart.css"

const Cart = () => {
    const user = useSelector((state) => state.session.user);

    const [total_price, setTotalPrice] = useState(0);
    const [amounts, setAmounts] = useState({});

    const cart = useLoaderData().cart.cart;
    const nav = useNavigate();

    useEffect(() => {
        let total = 0
        cart?.products?.map((product) => {
            total += (product.product.price * product.amount)
        })
        setTotalPrice(total)

        cart.products.forEach((product) => {
            setAmounts(prevAmounts => ({
                ...prevAmounts,
                [product.product.id]: product.amount
            }));
        })

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

    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            <div className="cart-products">
                {
                    cart?.products?.map((product) => (
                        <div className="products" key={`product_cart_${product.product.id}`}>
                            <img className="product-image-cart" src={product.product.image} onClick={(e) => { e.stopPropagation(); nav(`/product/${product.product.id}`) }} />
                            {/* <h4>{product.amount}</h4> */}
                            <div className="product-details-cart">
                                <p className="singleproduct-details">{product.product.name}</p>
                                <p className="singleproduct-details green">¥{product.product.price} Each</p>
                                <p className="singleproduct-details">{product.amount} in cart</p>
                            </div>

                            <Form method="put" className="cart-data-change" action={`/cart`}>
                                <input type="number" className="amount" name="amount" defaultValue={product.amount} id="product_amount" min={0} value={amounts[product.product.id]} onChange={(e) => handleAmountChange(product.product.id, +e.target.value)}>
                                    {/* {renderAmount(product.amount, product.product.id)} */}

                                </input>

                                <input type='hidden' value={product.product.id} name='product_id' />

                                <button
                                    type="submit"
                                    name='intent'
                                    value='update-product'
                                    className="submit-button"
                                >{
                                        amounts[product.product.id] > 0 && product.amount > 0 ? "Change" : "Remove"
                                    }</button>
                            </Form>

                        </div>
                    ))
                }
            </div>

            <div className="order-submit-details">
                <div>
                    <Form method="delete" action={`/cart`}>
                        <button
                            className="submit-button"
                            type="submit"
                            name='intent'
                            value='clear-cart'
                        >Clear Cart</button>
                    </Form>
                </div>
                <h3 className="green">Total price: ¥{total_price}</h3>
                {
                    cart?.products?.length > 0 ?
                        <Form method="post" action={`/cart`}>
                            <button
                                type="submit"
                                name='intent'
                                value='purchase-product'
                                className="submit-button"
                            >Purchase</button>
                            <input type="hidden" value={user.orders.length} name="order_index" />
                        </Form> : ""
                }
            </div>
        </div>
    )
}
export default Cart;
