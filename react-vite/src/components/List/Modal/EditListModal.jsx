import { Form } from "react-router-dom";
import { useState } from "react";


const EditList = ({ onClose, list_name, list_id, link }) => {

    const [listName, setListName] = useState(list_name)

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2 className="review-title-head">Edit List</h2>
            </div>
            <Form method="post" action={`/list/${link}`} onSubmit={onClose} className="form-container">
                <h3 className="review-title-body">List Name:</h3>
                <input className="form-box" required type='text' name="list_name" value={listName} onChange={(e) => setListName(e.target.value)} />
                {
                    listName.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }
                <input type="hidden" name="list_id" value={list_id} />
                <input type="hidden" name="link" value={link} />
                <button
                    className="submit-button-review"
                    type="submit"
                    disabled={listName === '' || listName.length > 30}
                    name='intent'
                    value='edit-list'
                >Submit Changes</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default EditList;
