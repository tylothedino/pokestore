import { Form } from "react-router-dom";
import "./Modal.css"
import { useEffect } from "react";


const DeleteReviewProduct = ({ onClose, product_id, review }) => {
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
                <h2 className="review-title-head">Delete List</h2>
            </div>
            <Form method="delete" action={`/product/${product_id}`} onSubmit={onClose} className="form-container">
                <input type="hidden" name="review_id" value={review.id} />

                <button
                    className="submit-button-review"
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
