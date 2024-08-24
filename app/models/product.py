from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# from .cart_product import cart_products
from .list_product import list_products


class Product(db.Model):

    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    effect = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    owner = db.relationship("User", back_populates="products")

    reviews = db.relationship(
        "Review", back_populates="product", cascade="all, delete-orphan"
    )
    order_products = db.relationship(
        "OrderProduct", backref="product_associated", cascade="all, delete-orphan"
    )

    cart_products = db.relationship(
        "CartProduct", backref="product", cascade="all, delete-orphan"
    )
    list = db.relationship("List", secondary=list_products, back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "effect": self.effect,
            "description": self.description,
            "image": self.image,
            "reviews": [review.to_dict() for review in self.reviews],
        }
