import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { useModal } from "../../context/Modal";
import CreateList from "./Modal/CreateListModal";
import EditList from "./Modal/EditListModal";
import DeleteList from "./Modal/DeleteListModal";

import './List.css'

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

    const handleDeleteList = (list_id, list_name) => {
        setModalContent(
            <div className="modal-container">
                <DeleteList
                    onClose={closeModal}
                    className="modal-container"
                    list_id={list_id}
                    link={''}
                    list_name={list_name}
                />
            </div>
        )
    }

    return (
        <div className="container">
            <div className="order-title">
                <h2 className="list-title">Your Lists</h2>
                <button className='button-create-list' ref={ulRef} type="submit" onClick={(e) => { e.stopPropagation(); handleCreateList(); }}>Create List</button>
            </div>

            {
                lists.lists.map((list, index) => (
                    <div key={list.name} className="single-list-in-all">
                        <h2 className="list-name">{list.name}</h2>
                        <h3 className='list-name-title' onClick={(e) => { e.stopPropagation(); nav(`/list/${index + 1}`) }}>View List</h3>

                        <div className="list-control-button" ref={ulRef}>
                            <button className='button-create-list' type="submit" onClick={(e) => { e.stopPropagation(); handleEditList(list.name, list.id); }}>Edit List</button>
                            <button className='button-create-list' type="submit" onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id, list.name); }}>Delete List</button>
                        </div>
                    </div>
                ))
            }

        </div >

    )
}

export default List
