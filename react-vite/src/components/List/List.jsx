import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { useModal } from "../../context/Modal";
import CreateList from "./Modal/CreateListModal";
const List = () => {
    const { lists } = useLoaderData();
    const nav = useNavigate();
    const { setModalContent, closeModal } = useModal();

    const ulRef = useRef();

    const handleCreateList = () => {
        setModalContent(
            <div className="modal-container">
                <CreateList
                    onClose={closeModal}
                    className="modal-container"
                />
            </div>
        )
    }

    return (
        <div>
            <div ref={ulRef}>
                <button type="submit" onClick={(e) => { e.stopPropagation(); handleCreateList(); }}>Create List</button>

            </div>

            {
                lists.lists.map((list, index) => (
                    <div key={list.name} onClick={(e) => { e.stopPropagation(); nav(`/list/${index + 1}`) }}>
                        <h3>{list.name}</h3>
                    </div>
                ))
            }

        </div >

    )
}

export default List
