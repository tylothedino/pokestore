import { Form } from "react-router-dom";
import { useState } from "react";


const EditReviewProduct = ({ onClose, product_id, user_id, review }) => {
    const [name, setName] = useState(review.name);
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Edit Review</h2>
            </div>
            <Form method="put" action={`/product/${product_id}`} onSubmit={onClose}>
                <p>Review Name:</p>
                <input required type='text' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    name.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }

                <p>Description:</p>
                <input required type='text' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />


                <p>Rating:</p>
                <input required max="5" min="0" type='number' name="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

                <input type="hidden" value={user_id} name="user_id" />
                <input type="hidden" value={product_id} name="product_id" />
                <input type="hidden" value={review.id} name="review_id" />
                <button
                    type="submit"
                    disabled={name === '' || name.length > 30}
                    name='intent'
                    value='edit-review'
                >Submit Review</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default EditReviewProduct;
