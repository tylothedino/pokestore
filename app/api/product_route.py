from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, db, Review, Cart, CartProduct
from sqlalchemy import func

product_routes = Blueprint("products", __name__)

existing_categories = [
    "standard-balls",
    "special-balls",
    "healing",
    "status-cures",
    "revival",
    "pp-recovery",
    "vitamins",
    "stat-boosts",
    "spelunking",
    "flutes",
    "collectibles",
    "evolution",
    "loot",
    "dex-completion",
    "mulch",
    "species-specific",
    "all-mail",
    "medicine",
    "picky-healing",
    "baking-only",
    "effort-drop",
    "type-protection",
    "in-a-pinch",
    "other",
    "held-items",
    "effort-training",
    "choice",
    "type-enhancement",
    "training",
    "scarves",
    "bad-held-items",
    "plates",
    "all-machines",
]


@product_routes.route("/")
def all_product():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route("/<string:category>")
def product_category(category):
    if category not in existing_categories:
        return {"errors": {"message": "Bad category"}}, 400

    products = Product.query.filter(
        func.lower(Product.category) == func.lower(category)
    ).all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route("/<int:id>")
def search_product_id(id):
    product = Product.query.get(id)

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    return {"product": product.to_dict()}


@product_routes.route("/search", methods=["POST"])
def search_product_name():
    product_name = request.get_json()
    products = Product.query.filter(
        func.lower(Product.name).like(f"%{func.lower(product_name['name'])}%")
    ).all()

    if products:
        return {"products": [product.to_dict() for product in products]}

    else:
        return {"message": "Product not found."}, 404


@product_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    product = request.get_json()

    if product["category"] not in existing_categories:
        return {"errors": {"message": "Bad category"}}, 400

    if len(product["name"] > 255):
        return {"errors": {"message": "Length of name exceeds 255"}}, 400

    new_product = Product(
        user_id=current_user.id,
        name=product["name"],
        price=product["price"],
        category=product["category"],
        effect=product["effect"],
        description=product["description"],
        image=product["image"],
    )

    db.session.add(new_product)
    db.session.commit()
    return {"product": new_product.to_dict()}


@product_routes.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    if product.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(product)
    db.session.commit()
    return {"message": f"Product {product.name} has been deleted"}


@product_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_product(id):
    body = request.get_json()
    product = Product.query.get(id)

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    if product.user_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    if body["name"] is not None:
        if len(body["name"] > 255):
            return {"errors": {"message": "Length of name exceeds 255"}}, 400
        else:
            product.name = body["name"]

    if body["price"] is not None:
        if body["price"] < 0:
            return {"errors": {"message": "Price cannot be a negative number"}}, 400
        else:
            product.price = body["price"]

    if body["category"] is not None:
        if body["category"] not in existing_categories:
            return {"errors": {"message": "Bad category"}}, 400
        else:
            product.category = body["category"]

    if body["effect"] is not None:
        product.effect = body["effect"]

    if body["description"] is not None:
        product.description = body["description"]

    if body["image"] is not None:
        product.image = body["image"]

    db.session.commit()
    return {"message": f"Updated product id: {id}"}


@product_routes.route("/<int:id>/review/add", methods=["POST"])
@login_required
def add_review(id):
    body = request.get_json()
    product = Product.query.get(id)

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    has_ordered = False

    for order in current_user.orders:
        if product in order.products:
            print("HAS ORDERED")
            has_ordered = True
            break
    if has_ordered:
        review = Review(
            name=body["name"],
            description=body["description"],
            image=body["image"],
            rating=body["rating"],
            user_id=current_user.id,
            product_id=id,
        )
        db.session.add(review)
        db.session.commit()

        return {"review": review.to_dict()}
    else:
        print("DID NOT ORDER")
        return {"errors": {"message": "You have not bought this"}}, 401


@product_routes.route("/<int:id>/add_to_cart", methods=["PUT"])
@login_required
def add_to_cart(id):
    body = request.get_json()
    product = Product.query.get(id)
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    existing_cart = CartProduct.query.filter_by(
        cart_id=cart.id, product_id=product.id
    ).first()
    amount = body["amount"]

    if product is None:
        return {"errors": {"message": "Not Found"}}, 404

    if existing_cart is None:
        cartProduct = CartProduct(cart_id=cart.id, product_id=product.id, amount=amount)
        db.session.add(cartProduct)
    else:
        existing_cart.amount += amount

    db.session.commit()

    return {"message": f"Added {amount} {product.name} to your cart"}
