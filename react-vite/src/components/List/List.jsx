import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import CreateList from "./Modal/CreateListModal";
import EditList from "./Modal/EditListModal";
import DeleteList from "./Modal/DeleteListModal";

const List = () => {
    const { lists } = useLoaderData();
    const nav = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const user = useSelector((state) => state.session.user);
    const ulRef = useRef();

    if (!user) {
        return (
            <>
                <h2>401 Unauthorized</h2>
            </>
        )
    }


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

    const handleEditList = (list_name, list_id) => {
        setModalContent(
            <div className="modal-container">
                <EditList
                    onClose={closeModal}
                    className="modal-container"
                    list_name={list_name}
                    list_id={list_id}
                    link={''}
                />
            </div>
        )
    }

    const handleDeleteList = (list_id) => {
        setModalContent(
            <div className="modal-container">
                <DeleteList
                    onClose={closeModal}
                    className="modal-container"
                    list_id={list_id}
                    link={''}
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

                        <div ref={ulRef}>
                            <button type="submit" onClick={(e) => { e.stopPropagation(); handleEditList(list.name, list.id); }}>Edit List</button>
                            <button type="submit" onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}>Delete List</button>
                        </div>
                    </div>
                ))
            }

        </div >

    )
}

export default List
