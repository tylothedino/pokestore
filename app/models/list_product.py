from .db import db, environment, SCHEMA, add_prefix_for_prod


list_products = db.Table(
    "list_products",
    db.Model.metadata,
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("lists.id"), ondelete="CASCADE"),
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
    list_products.schema = SCHEMA
