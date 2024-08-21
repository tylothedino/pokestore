from .db import db, environment, SCHEMA, add_prefix_for_prod


review_likes = db.Table(
    "review_likes",
    db.Model.metadata,
    db.Column(
        "review_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("reviews.id")),
        primary_key=True,
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
)


if environment == "production":
    review_likes.schema = SCHEMA
