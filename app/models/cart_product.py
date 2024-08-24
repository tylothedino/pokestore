from .db import db, environment, SCHEMA, add_prefix_for_prod

# cart_products = db.Table(
#     "cart_products",
#     db.Model.metadata,
#     db.Column(
#         "cart_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("carts.id"), ondelete="CASCADE"),
#         nullable=False,
#     ),
#     db.Column(
#         "product_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"),
#         nullable=False,
#     ),
#     extend_existing=True,
# )
# if environment == "production":
#     cart_products.schema = SCHEMA


class CartProduct(db.Model):
    __tablename__ = "cart_product"

    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True
    )
    amount = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"cart": self.cart_id, "product": self.product_id, "amount": self.amount}
