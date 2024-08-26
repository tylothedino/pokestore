import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


const Orders = () => {
    const user = useSelector((state) => state.session.user);
    const { orders } = useLoaderData();
    const nav = useNavigate();

    if (!user) {
        return (
            <h2>401 Unauthorized</h2>

        )
    }

    return (
        <div>
            <h2>Orders</h2>
            {
                orders.orders.map((order, index) => (
                    <div key={index + "orderNumber" + order.id}>
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
                                    </div>
                                ))
                            }
                        </div>
                        {
                            order.status != 'Cancelled' && order.status != 'Returned' ?

                                <Form method='delete' action={`/order/${order.id}`} >
                                    <button type="submit" name="intent" value='cancel-order'>Cancel Order</button>
                                    <input type='hidden' value={order.id} name="order_id" />
                                    <input type='hidden' value={index} name="order_index" />
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
