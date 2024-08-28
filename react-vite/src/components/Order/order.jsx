import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import CreateReview from "../Review/Modal/ReviewModal";
import { useModal } from "../../context/Modal";

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
        <div>
            <h2>Orders</h2>
            {
                orders.orders.sort(handleSort).map((order, index) => (
                    <div key={index + "orderNumber" + order.id} onClick={(e) => { e.stopPropagation(); nav(`/order/${orders.orders.length - index}`) }}>
                        <header>
                            <h4>Order placed: {order.created_at}</h4>
                            <h4>Order #{order.id}</h4>
                            <h4>Total cost:{order.total_cost}</h4>
                            <h4>Order Status: {order.status}</h4>
                        </header>
                        <div>
                            {
                                order.products.map((product) => (
                                    <div key={product.product.id}>
                                        <img src={product.product.image} />
                                        <p>{product.product.name}</p>
                                        <p>Amount: {product.amount}</p>
                                        <button onClick={(e) => { e.stopPropagation(); nav(`/product/${product.product.id}`) }}>View Product</button>

                                        <button type="submit" onClick={(e) => { e.stopPropagation(); handleCreateReview(product.product.id, order.id); }}>Add Review</button>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            order.status != 'Cancelled' && order.status != 'Returned' ?

                                <Form method='delete' action={`/order/${order.id}`} >
                                    <button type="submit" name="intent" value='cancel-order'>Cancel Order</button>
                                    <input type='hidden' value={order.id} name="order_id" />
                                    <input type='hidden' value={index + 1} name="order_index" />
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
