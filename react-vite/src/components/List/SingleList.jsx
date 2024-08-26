import { Form, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const SingleList = () => {
    const { lists } = useLoaderData();
    const { id } = useParams();
    const nav = useNavigate();

    const currentList = lists.lists[id - 1]

    return (
        <div>
            <h2>{currentList.name}</h2>
            {
                currentList.products.map((product) => (
                    <div key={product.name} onClick={(e) => { e.stopPropagation(); nav(`/product/${product.id}`) }}>
                        <h3>{product.name}</h3>
                        <img src={product.image} />
                        <h3>{product.price}</h3>

                        <Form method='put' action={`/list/${id}`} >
                            <input type="hidden" value={id} name="current_index" />
                            <input type="hidden" value={currentList.id} name="list_id" />
                            <input type="hidden" value={product.id} name="product_id" />
                            <button type="submit" name="intent" value='remove-product'>Remove {product.name}</button>
                        </Form>
                    </div>

                ))
            }

        </div>

    )
}

export default SingleList
