from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .list_product import list_products


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="lists")

    products = db.relationship(
        "Product", secondary=list_products, back_populates="list"
    )

    def to_dict(self):
        return {
            "name": self.name,
            "id": self.id,
            "products": [product.to_dict() for product in self.products],
            "updated_at": self.updated_at,
        }
