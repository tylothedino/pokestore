from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, List, Product


list_routes = Blueprint("lists", __name__)


@list_routes.route("/")
@login_required
def get_lists():
    lists = List.query.filter(List.user_id == current_user.id).all()

    return {"lists": [list.to_dict() for list in lists]}


@list_routes.route("/create", methods=["POST"])
@login_required
def create_list():
    body = request.get_json()
    new_list = List(user_id=current_user.id, name=body["name"])

    db.session.add(new_list)
    db.session.commit()

    return {"list": new_list.to_dict()}


@list_routes.route("/add/<int:id>", methods=["PUT"])
@login_required
def add_to_list(id):
    body = request.get_json()

    product_list = List.query.get(id)
    product = Product.query.get(body["product_id"])

    if product_list.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if product is None or product_list is None:
        return {"errors": {"message": "Not Found"}}, 404

    if product in product_list.products:
        return {"messages": "This product is already in this list"}

    product_list.products.append(product)
    db.session.commit()
    return {"messages": f"Added {product.name} to {product_list.name}"}


@list_routes.route("/remove-from-list/<int:id>", methods=["PUT"])
@login_required
def remove_from_list(id):
    body = request.get_json()

    product_list = List.query.get(id)
    product = Product.query.get(body["product_id"])

    if product_list.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if product is None or product_list is None:
        return {"errors": {"message": "Not Found"}}, 404

    if product not in product_list.products:
        return {"message": "This product is not in this list"}

    product_list.products.remove(product)
    db.session.commit()

    return {"message": f"Removed {product.name} from {product_list.name}"}


@list_routes.route("/remove/<int:id>", methods=["DELETE"])
@login_required
def remove_list(id):
    product_list = List.query.get(id)

    if product_list.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if product_list is None:
        return {"errors": {"message": "Not Found"}}, 404

    db.session.delete(product_list)
    db.session.commit()

    return {"message": "Successfully deleted the list"}
