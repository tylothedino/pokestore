from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db, Product


review_routes = Blueprint("reviews", __name__)


@review_routes.route("/<int:id>")
def get_review(id):
    review = Review.query.get(id)

    if review is None:
        return {"errors": {"message": "Not Found"}}, 404

    return {"review": review.to_dict()}


@review_routes.route("/product/<int:product_id>")
def get_product_review(product_id):
    product = Product.query.get(product_id)

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    reviews = Review.query.filter(product in Review.product)

    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_review(id):
    body = request.get_json()
    print("HERE IS THE BODY__________________")
    print(body)
    review = Review.query.get(id)
    print("MY REVIEW", review)
    if review is None:
        return {"errors": {"message": "Not Found"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if body["name"] is not None:
        review.name = body["name"]

    if body["description"] is not None:
        review.description = body["description"]

    if body["rating"] is not None:
        review.rating = body["rating"]

    db.session.commit()
    return {"message": "Updated review"}


@review_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review is None:
        return {"errors": {"message": "Not Found"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(review)
    db.session.commit()

    return {"message": "Review has been deleted"}
