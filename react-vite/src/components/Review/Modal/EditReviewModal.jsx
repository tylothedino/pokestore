import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Modal.css"

const EditReviewProduct = ({ onClose, product_id, user_id, review }) => {
    const [name, setName] = useState(review.name);
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);

    useEffect(() => {
        const handlePageChange = () => {
            // Perform actions when page changes
            onClose();
        };

        window.addEventListener('popstate', handlePageChange);

        return () => {
            window.removeEventListener('popstate', handlePageChange);
        };
    }, [onClose]);


    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2 className="review-title-head">Edit Review</h2>
            </div>
            <Form method="put" action={`/product/${product_id}`} onSubmit={onClose} className="form-container">
                <p className="review-title-body">Review Name:</p>
                <input className="form-box" required type='text' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    name.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }

                <p className="review-title-body">Description:</p>
                <input className="form-box forms" required type='text' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />


                <p className="review-title-body">Rating: {rating}</p>
                <input required max="5" min="0" type='range' name="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

                <input type="hidden" value={user_id} name="user_id" />
                <input type="hidden" value={product_id} name="product_id" />
                <input type="hidden" value={review.id} name="review_id" />
                <button
                    className="submit-button-review"
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
