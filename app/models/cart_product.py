from .db import db, environment, SCHEMA, add_prefix_for_prod


cart_products = db.Table(
    "cart_products",
    db.Model.metadata,
    db.Column(
        "cart_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("carts.id"), ondelete="CASCADE"),
        primary_key=True,
    ),
    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"),
        primary_key=True,
    ),
)


if environment == "production":
    cart_products.schema = SCHEMA
