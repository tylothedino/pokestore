import { Form, useActionData, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import CreateReviewProduct from "../Review/Modal/ReviewModal";
import { useEffect, useState } from "react";

import { useModal } from "../../context/Modal";
import EditReviewProduct from "../Review/Modal/EditReviewModal";
import DeleteReviewProduct from "../Review/Modal/DeleteReviewModal";

import "./style/SingleProduct.css"

import { useDispatch } from "react-redux";

import { thunkAuthenticate } from "../../redux/session";

const SingleProduct = () => {
    const { products } = useLoaderData();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user);

    const action = useActionData();


    const dispatch = useDispatch();


    const current_product = products.product;
    const product_review = current_product?.reviews;
    const product_category = current_product?.category.split('-')

    product_category?.map((product, index) => {
        product_category[index] = product.charAt(0).toUpperCase() + product.slice(1);
    })

    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);



    const [product_amount, set_amount] = useState(1);
    const [list, setList] = useState(+user?.lists[0]?.id);

    const [actionResponse, setActionResponse] = useState("")
    const [actionResponses, setActionResponses] = useState("")

    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        setActionResponse(action?.messages)
    }, [action?.messages])

    useEffect(() => {
        setActionResponses(action?.message)
    }, [action?.message])

    // console.log("ACTION: ", actionResponses)
    // console.log(user)
    // console.log(id)

    const handleCreateReview = () => {
        setModalContent(
            <div className="modal-container">
                <CreateReviewProduct
                    onClose={closeModal}
                    className="modal-container"
                    product_id={id}
                    user_id={user.id}
                />
            </div>
        )
    }

    const handleEditReview = (review) => {
        setModalContent(
            <div className="modal-container">
                <EditReviewProduct
                    onClose={closeModal}
                    className="modal-container"
                    product_id={id}
                    user_id={user.id}
                    review={review}
                />
            </div>
        )
    }

    const handleDeleteReview = (review) => {
        setModalContent(
            <div className="modal-container">
                <DeleteReviewProduct
                    onClose={closeModal}
                    className="modal-container"
                    product_id={id}
                    user_id={user.id}
                    review={review}
                />
            </div>
        )
    }

    return (
        <div>

            <div className="product-information">
                <img className="single-product-image" src={current_product?.image} />

                <div className="single-product-details">
                    <h3 className="product-name">{current_product?.name}</h3>
                    {
                        current_product?.reviews.length > 0 ? <p className="singleproduct-details">⭐{(current_product?.reviews.reduce((accum, review) => (
                            accum + review.rating
                        ), 0) / current_product?.reviews.length).toFixed(1)}</p> : <p>⭐-</p>
                    }
                    <p className="singleproduct-details">Category - {product_category?.join(" ")}</p>
                    <p className="singleproduct-details green">¥{current_product?.price}</p>

                    <p className="singleproduct-details">{current_product?.description}</p>
                    <p className="singleproduct-details">{current_product?.effect}</p>

                </div>


                <div className={`purchase-product ${!user ? "hidden" : ""}`} >
                    {
                        user ? <Form method='put' action={`/product/${id}`} className="form-of-product">
                            <h3 className="add-to-cart">Add to Cart</h3>
                            <p className="singleproduct-details center no-margin margin-top">Quantity</p>
                            <div>
                                <select className="select-cart-amount" name="amount" id="product_amount" value={product_amount} onChange={(e) => set_amount(+e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <input type='hidden' value={id} name="product_id" />
                            <button
                                type="submit"
                                name='intent'
                                value='add-product-to-cart'
                                className="add-to-cart-button"
                            >Add to Cart</button>
                            {
                                actionResponses ? <p className="response">{actionResponses}</p> : ""
                            }
                        </Form>
                            : ""
                    }
                    {
                        (user && user.lists.length > 0) ?

                            <div>
                                <h3 className="add-to-list">Add to List</h3>
                                <Form method='put' action={`/product/${id}`} >
                                    <select className='select-list' name="list" id="list" value={list} onChange={(e) => setList(e.target.value)}>
                                        {
                                            user.lists?.map((list) => (
                                                list.products.includes(current_product) ? "" : <option key={list.id} value={list.id}>{list.name}</option>
                                            ))
                                        }

                                    </select>
                                    <input type='hidden' value={id} name="product_id" />
                                    <button
                                        type="submit"
                                        name='intent'
                                        value='add-product-to-list'
                                        className="add-to-cart-button "
                                    >Add to List</button>
                                    {
                                        actionResponse ? <p className="response">{actionResponse}</p> : ""
                                    }
                                </Form>
                            </div>

                            : ""
                    }




                </div>


            </div>


            <div className="reviews-container">
                <h3 className="review-title">Customer Reviews</h3>
                {
                    user ? <button type="submit" className="button-review-submit" onClick={(e) => { e.stopPropagation(); handleCreateReview(); }}>Write a review</button> : ""
                }
                {

                    product_review?.map((review) => (
                        <div key={review.id} className="review-box">
                            <h4 className="singleproduct-details">{review.name}</h4>
                            <p className="user-review">👩‍🦲 {review.owner.username}</p>
                            <p className="singleproduct-details">Reviewed on - {review.updated_at}</p>
                            <p className="user-description-review">{review.description}</p>
                            <p className="singleproduct-details">⭐{review.rating}</p>
                            <img src={review.image} />
                            {
                                review.owner.id === user?.id ?
                                    <div>
                                        <button type="submit" onClick={(e) => { e.stopPropagation(); handleEditReview(review); }} className="button-review-submit">Edit Review</button>
                                        <button type="submit" onClick={(e) => { e.stopPropagation(); handleDeleteReview(review); }} className="button-review-submit">Delete Review</button>
                                    </div>
                                    : ""
                            }
                        </div>

                    ))
                }
            </div>

        </div>
    )

}


export default SingleProduct;
