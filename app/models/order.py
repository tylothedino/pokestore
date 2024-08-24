from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Order(db.Model):

    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False)
    total_cost = db.Column(db.Integer, nullable=False)
    delivery_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship("User", back_populates="orders")
    order_products = db.relationship(
        "OrderProduct", backref="order", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "total_cost": self.total_cost,
            "delivery_date": self.delivery_date,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "products": [product.to_dict() for product in self.order_products],
        }
