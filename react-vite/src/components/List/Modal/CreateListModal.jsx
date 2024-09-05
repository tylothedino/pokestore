import { Form } from "react-router-dom";
import { useEffect, useState } from "react";


const CreateList = ({ onClose }) => {

    const [listName, setListName] = useState("");
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
                <h2 className="review-title-head">Create List</h2>
            </div>
            <Form className="form-container" method="post" action={`/list`} onSubmit={onClose}>
                <h3 className="review-title-body">List Name:</h3>
                <input className="form-box" required type='text' name="list_name" value={listName} onChange={(e) => setListName(e.target.value)} />
                {
                    listName.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }
                <button
                    type="submit"
                    className="submit-button-review"
                    disabled={listName === '' || listName.length > 30}
                    name='intent'
                    value='create-list'
                >Create List</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default CreateList;
