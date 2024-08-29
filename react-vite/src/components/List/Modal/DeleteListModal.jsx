import { Form } from "react-router-dom";

const DeleteList = ({ onClose, list_id, link, list_name }) => {

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2 className="review-title-head">Are you sure you want to delete your list?</h2>
            </div>
            <Form className="form-container" method="delete" action={`/list/${link}`} onSubmit={onClose}>
                <input type="hidden" name="list_id" value={list_id} />

                <button
                    className="submit-button-review"
                    type="submit"
                    name='intent'
                    value='delete-list'
                >Delete {list_name}</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default DeleteList;
