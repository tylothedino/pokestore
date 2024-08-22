from app.models import db, Review, environment, SCHEMA, User
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_review_likes():
    review = Review.query.get(1)
    user = User.query.get(2)
    user2 = User.query.get(3)

    review.user_likes.append(user)
    review.user_likes.append(user2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.review_likes RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM review_likes"))

    db.session.commit()
