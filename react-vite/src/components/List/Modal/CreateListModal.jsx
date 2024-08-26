import { Form } from "react-router-dom";
import { useState } from "react";


const CreateList = ({ onClose }) => {

    const [listName, setListName] = useState("")

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Create List</h2>
            </div>
            <Form method="post" action={`/list`} onSubmit={onClose}>
                <h3>List Name:</h3>
                <input required type='text' name="list_name" value={listName} onChange={(e) => setListName(e.target.value)} />
                {
                    listName.length > 30 ? <p className="error">List name cannot exceed 30 characters</p> : ""
                }
                <button
                    type="submit"
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
