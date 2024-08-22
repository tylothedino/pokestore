from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, Order, Product
import re

cart_routes = Blueprint("carts", __name__)


@cart_routes.route("/")
@login_required
def all_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    return {"cart": cart.to_dict()}


@cart_routes.route("/clear", methods=["DELETE"])
@login_required
def clear_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    cart.products = []
    db.session.commit()

    return {"message": "Cleared your cart"}


@cart_routes.route("/remove/<int:product_id>", methods=["PUT"])
@login_required
def remove_product(product_id):

    # Grab amount
    body = request.get_json()
    amount = body["amount"]

    # Find the product
    product = Product.query.get(product_id)
    # Grab the user's cart
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    # Find if the cart has the product
    cart_product = re.findall(product, cart.products)

    # If you are trying to remove more than what you have
    if len(cart_product) < amount:
        return {"errors": {"message": "You can't delete more than what you have"}}, 400

    # If you don't have the product
    if not cart_product:
        return {"errors": {"message": "You don't have this product"}}, 400

    # Remove the product by the amount you specify
    for _ in range(amount):
        cart.products.remove(product)
    db.session.commit()

    return {"message": f"Removed {amount} {product.name} from your cart"}


@cart_routes.route("/remove/<int:product_id>/all", methods=["PUT"])
@login_required
def remove_all_product(product_id):

    # Find the product
    product = Product.query.get(product_id)
    # Grab the user's cart
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    # Find if the cart has the product
    cart_product = re.findall(product, cart.products)

    # If you don't have the product
    if not cart_product:
        return {"errors": {"message": "You don't have this product"}}, 400

    # Remove the product by the amount you specify
    for _ in range(len(cart_product)):
        cart.products.remove(product)
    db.session.commit()

    return {"message": f"Removed {product.name} from your cart"}


@cart_routes.route("/purchase", methods=["POST"])
@login_required
def purchase():
    # Grab the user's cart
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    # Get the total sum of all the products in the cart
    total = sum(product.price for product in cart.products)

    # Create an order with the status of - PENDING
    order = Order(
        status="pending", total_cost=total, delivery_date=None, user_id=current_user.id
    )

    db.session.add(order)
    db.session.commit()

    # Add the products from the cart to the order
    for product in cart.products:
        order.append(product)

    db.session.commit()

    return {"order": order.to_dict()}
