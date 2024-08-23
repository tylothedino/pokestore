from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order


order_routes = Blueprint("orders", __name__)

order_status = ["Pending", "Returned", "Delivered"]


@order_routes.route("/")
@login_required
def all_order():
    orders = Order.query.filter(Order.user_id == current_user.id).all()

    return {"orders": [order.to_dict() for order in orders]}


@order_routes.route("/<int:id>")
@login_required
def find_order(id):
    order = Order.query.get(id)

    if current_user.id != order.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    return {"orders": order.to_dict()}


@order_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_order(id):
    order = Order.query.get(id)

    if current_user.id != order.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if order is None:
        return {"errors": {"message": "Not Found"}}, 404

    body = request.get_json()

    if body["status"]:
        if body["status"] not in order_status and body["status"] is not None:
            return {"errors": {"message": "Bad status"}}, 400
        order.status = body["status"]
    if body["delivery_date"] and body["status"] == "Pending":
        order.delivery_date = body["delivery_date"]

    db.session.commit()

    return {"order": order.to_dict()}


@order_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def cancel_order(id):
    order = Order.query.get(id)

    if current_user.id != order.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    order.status = "Cancelled"

    order.total_cost = 0
    order.delivery_date = None

    db.session.commit()

    return {"message": "Order cancelled"}
