import { Form, useLoaderData, useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import EditList from "./Modal/EditListModal";
import { useModal } from "../../context/Modal";
import { useRef } from "react";
import DeleteList from "./Modal/DeleteListModal";
import { useSelector } from "react-redux";

const SingleList = () => {
    const { lists } = useLoaderData();
    const { id } = useParams();
    const nav = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const ulRef = useRef();
    const user = useSelector((state) => state.session.user);

    if (!user) {
        return (
            <h2>401 Unauthorized</h2>

        )
    }
    const currentList = lists.lists[id - 1]

    const handleEditList = (list_name, list_id) => {
        setModalContent(
            <div className="modal-container">
                <EditList
                    onClose={closeModal}
                    className="modal-container"
                    list_name={list_name}
                    list_id={list_id}
                    link={id}
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
            <h2>{currentList.name}</h2>
            <div ref={ulRef}>
                <button type="submit" onClick={(e) => { e.stopPropagation(); handleEditList(currentList.name, currentList.id); }}>Edit List</button>
                <button type="submit" onClick={(e) => { e.stopPropagation(); handleDeleteList(currentList.id); }}>Delete List</button>

            </div>
            {
                currentList.products.map((product) => (
                    <div key={product.name} onClick={(e) => { e.stopPropagation(); nav(`/product/${product.id}`) }}>
                        <h3>{product.name}</h3>
                        <img src={product.image} />
                        <h3>{product.price}</h3>

                        <Form method='put' action={`/list/${id}`} >
                            <input type="hidden" value={id} name="current_index" />
                            <input type="hidden" value={currentList.id} name="list_id" />
                            <input type="hidden" value={product.id} name="product_id" />
                            <button type="submit" name="intent" value='remove-product'>Remove {product.name}</button>
                        </Form>
                    </div>

                ))
            }

        </div>

    )
}

export default SingleList
