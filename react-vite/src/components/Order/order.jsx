import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import CreateReview from "../Review/Modal/ReviewModal";
import { useModal } from "../../context/Modal";

import './Order.css'

const Orders = () => {
    const user = useSelector((state) => state.session.user);
    const { orders } = useLoaderData();
    const nav = useNavigate();
    const { setModalContent, closeModal } = useModal();
    if (!user) {
        return (
            <h2>401 Unauthorized</h2>

        )
    }

    const handleSort = (a, b) => {
        return b.id - a.id;
    }

    const handleCreateReview = (product_id, order_id) => {
        setModalContent(
            <div className="modal-container">
                <CreateReview
                    onClose={closeModal}
                    className="modal-container"
                    product_id={product_id}
                    user_id={user.id}
                    order_id={order_id}
                />
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="list-title">Orders</h2>
            {
                orders.orders.sort(handleSort).map((order, index) => (
                    <div key={index + "orderNumber" + order.id} onClick={(e) => { e.stopPropagation(); nav(`/order/${orders.orders.length - index}`) }} className="order-container">
                        <header className="order-details-title">
                            <h4>Order placed: {order.created_at}</h4>
                            <h4>Order #{order.id}</h4>
                            <h4>Total cost: ¥{order.total_cost}</h4>
                            <h4>Order Status: {order.status}</h4>
                        </header>
                        <div>
                            {
                                order.products.map((product) => (
                                    <div key={product.product.id} className="products gap order-products">
                                        <img className="product-image-cart" src={product.product.image} />
                                        <div className="product-details-order">
                                            <p className="singleproduct-details">{product.product.name}</p>
                                            <p className="singleproduct-details">Amount: {product.amount}</p>
                                        </div>
                                        <button className="submit-button height-larger " onClick={(e) => { e.stopPropagation(); nav(`/product/${product.product.id}`) }}>View Product</button>

                                        <button className="submit-button height-larger " type="submit" onClick={(e) => { e.stopPropagation(); handleCreateReview(product.product.id, order.id); }}>Add Review</button>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            order.status != 'Cancelled' && order.status != 'Returned' ?

                                <Form method='delete' action={`/order/${order.id}`} >
                                    <button className="submit-button-review" type="submit" name="intent" value='cancel-order'>Cancel Order</button>
                                    <input type='hidden' value={order.id} name="order_id" />
                                    <input type='hidden' value={orders.orders.length - index} name="order_index" />
                                </Form>

                                : ""
                        }
                    </div>
                ))
            }
        </div>
    )

}

export default Orders
