import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


const SingleOrder = () => {

    const { orders } = useLoaderData();
    const { id } = useParams();

    const user = useSelector((state) => state.session.user);

    if (!user) {
        return (
            <h2>401 Unauthorized</h2>

        )
    }
    const current_order = orders.orders[id - 1]

    if (!current_order) {
        return (
            <h2>404 Order not found</h2>

        )
    }

    // console.log(current_order)

    return (
        <div className="container">
            <h2 className="list-title no-bottom">Order Details</h2>
            <h3 className="list-title no-top no-bottom ">Order ID #{current_order.id}</h3>
            <div className="order-details ">
                <p>Delivery Address: {current_order.delivery_address}</p>
                {
                    current_order.status === 'Delivered' ? <p>Delivered at: {current_order.delivery_date}</p> : ""
                }

                {
                    current_order.status === 'Pending' ? <p>Order Status: Order is pending delivery</p> : ""
                }
                {
                    current_order.status === 'Cancelled' || current_order.status === "Returned" ? <p>Order Status: {current_order.status}</p> : ""
                }
            </div>

            {
                current_order.products.map((product) => (
                    <div key={product.product.id} className="products margins gap">
                        <img className="product-image-cart" src={product.product.image} />

                        <p className="singleproduct-details">{product.product.name}</p>
                        <p className="singleproduct-details">Amount: {product.amount}</p>

                    </div>
                ))
            }
            <h3 className="list-title green">Order Total: {current_order.total_cost}</h3>
            {
                current_order.status != 'Cancelled' && current_order.status != 'Returned' ?

                    <Form method='delete' action={`/order/${id}`} >
                        <button className="submit-button-review" type="submit" name="intent" value='cancel-order'>Cancel Order</button>
                        <input type='hidden' value={current_order.id} name="order_id" />
                        <input type='hidden' value={id} name="order_index" />
                    </Form>

                    : ""
            }
        </div>
    )

}


export default SingleOrder
