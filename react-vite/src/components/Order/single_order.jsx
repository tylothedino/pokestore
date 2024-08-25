import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


const SingleOrder = () => {

    const { orders } = useLoaderData();
    const { id } = useParams();

    const user = useSelector((state) => state.session.user);
    const current_order = orders.orders[id - 1]


    if (!user) {
        return (
            <h2>401 Unauthorized</h2>

        )
    }

    if (!current_order) {
        return (
            <h2>404 Order not found</h2>

        )
    }

    // console.log(current_order)

    return (
        <div>
            <h2>Order Details</h2>
            <h3>Order ID #{current_order.id}</h3>
            {
                current_order.status === 'Delivered' ? <p>Delivered at: {current_order.delivery_date}</p> : ""
            }

            {
                current_order.status === 'Pending' ? <p>Order is pending delivery</p> : ""
            }
            {
                current_order.status === 'Cancelled' || current_order.status === "Returned" ? <p>Order has been {current_order.status}</p> : ""
            }

            {
                current_order.products.map((product) => (
                    <div key={product.product.id}>
                        <img src={product.product.image} />
                        <p>{product.amount}</p>
                        <p>{product.product.name}</p>
                    </div>
                ))
            }
            <h3>Order Total: {current_order.total_cost}</h3>
            {
                current_order.status != 'Cancelled' && current_order.status != 'Returned' ?

                    <Form method='delete' action={`/order/${current_order.id}`} >
                        <button type="submit" name="intent" value='cancel-order'>Cancel Order</button>
                        <input type='hidden' value={current_order.id} name="order_id" />
                    </Form>

                    : ""
            }
        </div>
    )

}


export default SingleOrder
