from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .cart import Cart
from sqlalchemy import event

from .review_likes import review_likes


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    products = db.relationship("Product", back_populates="owner")
    orders = db.relationship("Order", back_populates="user")
    lists = db.relationship("List", back_populates="user")
    reviews = db.relationship("Review", back_populates="owner")

    likes = db.relationship(
        "Review", secondary=review_likes, back_populates="user_likes"
    )

    cart = db.relationship("Cart", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "address": self.address,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "products": self.products,
            "orders": self.orders,
        }


@event.listens_for(User, "after_insert")
def after_user_insert(mapper, connection, target):
    new_cart = Cart(
        user_id=target.id
    )  # Create a new Cart instance with the user_id set
    db.session.add(new_cart)  # Add the new cart using connection


# # Listen for the 'after_insert' event on the User model
# event.listen(User, "after_insert", create_cart_on_user_creation)
