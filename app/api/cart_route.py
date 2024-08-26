from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, Order, Product, CartProduct, OrderProduct
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
    cart.cart_products = []
    print("CLEARED CART")
    db.session.commit()

    return {"message": "Cleared your cart"}


@cart_routes.route("/remove/<int:product_id>", methods=["PUT"])
@login_required
def remove_product(product_id):

    body = request.get_json()
    product = Product.query.get(product_id)
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    existing_cart = CartProduct.query.filter_by(
        cart_id=cart.id, product_id=product.id
    ).first()
    amount = body["amount"]

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    if existing_cart.amount < amount:
        return {"errors": {"message": "Cannot remove more than what you have"}}, 400

    if existing_cart.amount == amount:
        db.session.delete(existing_cart)

    else:
        existing_cart.amount -= amount

    db.session.commit()

    return {"message": f"Removed {amount} {product.name} to your cart"}


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
    print("aawdawdawdawdawdawd", cart.to_dict()["products"])

    products = cart.to_dict()["products"]

    total = 0

    for x in products:
        total += x["product"]["price"] * x["amount"]

    # Create an order with the status of - PENDING
    order = Order(
        status="Pending", total_cost=total, delivery_date=None, user_id=current_user.id
    )

    db.session.add(order)
    db.session.commit()

    # Add the products from the cart to the order
    for product in products:
        add_products = OrderProduct(
            order_id=order.id,
            product_id=product["product"]["id"],
            amount=product["amount"],
        )
        db.session.add(add_products)

    db.session.commit()

    cart.cart_products = []

    db.session.commit()

    return {"order": order.to_dict()}
