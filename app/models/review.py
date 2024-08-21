from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

from .review_likes import review_likes


class Review(db.Model):

    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"))
    )

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    owner = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    user_likes = db.relationship("User", secondary=review_likes, back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "created_at": self.created_at,
            "product_id": self.product_id,
            "user_id": self.user_id,
        }
