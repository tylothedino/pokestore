# from .db import db, environment, SCHEMA, add_prefix_for_prod


# order_products = db.Table(
#     "order_products",
#     db.Model.metadata,
#     db.Column(
#         "order_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("orders.id")),
#         primary_key=True,
#     ),
#     db.Column(
#         "product_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("products.id")),
#         primary_key=True,
#     ),
# )


# if environment == "production":
#     order_products.schema = SCHEMA

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .product import Product


class OrderProduct(db.Model):
    __tablename__ = "order_product"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    order_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), primary_key=True
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True
    )
    amount = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "order": self.order_id,
            "product": {
                "id": self.product_id,
                "name": Product.query.get(self.product_id).name,
                "price": Product.query.get(self.product_id).price,
                "category": Product.query.get(self.product_id).category,
                "effect": Product.query.get(self.product_id).effect,
                "description": Product.query.get(self.product_id).description,
                "image": Product.query.get(self.product_id).image,
                # "reviews": [
                #     review.to_dict()
                #     for review in Product.query.get(self.product_id).reviews
                # ],
            },
            "amount": self.amount,
        }
