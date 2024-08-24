from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product import Product


class CartProduct(db.Model):
    __tablename__ = "cart_product"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True
    )
    amount = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "cart": self.cart_id,
            "product": {
                "id": self.product_id,
                "name": Product.query.get(self.product_id).name,
                "price": Product.query.get(self.product_id).price,
                "category": Product.query.get(self.product_id).category,
                "effect": Product.query.get(self.product_id).effect,
                "description": Product.query.get(self.product_id).description,
                "image": Product.query.get(self.product_id).image,
                "reviews": [
                    review.to_dict()
                    for review in Product.query.get(self.product_id).reviews
                ],
            },
            "amount": self.amount,
        }
