import { Form } from "react-router-dom";
import { useState } from "react";


const DeleteList = ({ onClose, list_id, link }) => {

    return (
        < div className="modalbox" >
            <div>
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Delete List</h2>
            </div>
            <Form method="delete" action={`/list/${link}`} onSubmit={onClose}>
                <input type="hidden" name="list_id" value={list_id} />

                <button
                    type="submit"
                    name='intent'
                    value='delete-list'
                >Delete List</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default DeleteList;
