import { Form } from "react-router-dom";



const DeleteReviewProduct = ({ onClose, product_id, review }) => {

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Delete List</h2>
            </div>
            <Form method="delete" action={`/product/${product_id}`} onSubmit={onClose}>
                <input type="hidden" name="review_id" value={review.id} />

                <button
                    type="submit"
                    name='intent'
                    value='delete-review'
                >Delete Review</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default DeleteReviewProduct;
