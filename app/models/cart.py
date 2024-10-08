from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .product import Product

# from .cart_product import cart_products


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    cart_products = db.relationship(
        "CartProduct", backref="cart", cascade="all, delete-orphan"
    )

    user = db.relationship("User", back_populates="cart")

    def to_dict(self):
        return {
            "id": self.id,
            "updated_at": self.updated_at,
            "products": [product.to_dict() for product in self.cart_products],
            # "products": self.cart_products[0].to_dict(),
        }
