import { Form } from "react-router-dom";
import { useState } from "react";

const CreateReview = ({ onClose, product_id, user_id }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(5);

    return (
        <div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Create Review</h2>
            </div>
            <Form method="post" action={`/order`} onSubmit={onClose}>
                <p>Review Name:</p>
                <input required type='text' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    name.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }

                <p>Description:</p>
                <input required type='text' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />


                <p>Rating: {rating}</p>
                <input required max="5" min="0" type='range' name="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

                <input type="hidden" value={user_id} name="user_id" />
                <input type="hidden" value={product_id} name="product_id" />
                <button
                    type="submit"
                    disabled={name === '' || name.length > 30}
                    name='intent'
                    value='create-review'
                >Create Review</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default CreateReview;
